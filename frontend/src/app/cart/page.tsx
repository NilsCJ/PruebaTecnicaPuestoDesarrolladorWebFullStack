'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useAxios from '../hooks/useAxios';
import { useRouter } from 'next/navigation';
import DataTable, { TableColumn } from 'react-data-table-component';

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const axios = useAxios();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (!user) return router.push('/login');
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    const res = await axios.get('/cart');
    setCart(res.data);
  };

  const handleRemove = async (id: number) => {
    await axios.delete(`/cart/remove/${id}`);
    fetchCart();
  };

  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const filteredItems = cart.filter((item) =>
    item.nombre.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns: TableColumn<CartItem>[] = [
    {
      name: 'Imagen',
      cell: (row) => <img src={`http://localhost:4000${row.imagen}`} width={60} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Producto',
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: (row) => row.cantidad.toString(),
    },
    {
      name: 'Precio',
      selector: (row) => `₡ ${row.precio}`,
    },
    {
      name: 'Subtotal',
      selector: (row) => `₡ ${row.precio * row.cantidad}`,
    },
    {
      name: 'Acción',
      cell: (row) => (
        <button className="btn btn-danger btn-sm" onClick={() => handleRemove(row.id)}>
          Eliminar
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <div className="text-center mt-5">
          <h4>🛒 ¡Tu carrito está vacío!</h4>
          <p>Explora nuestros productos y encuentra lo que necesitas.</p>
          <button className="btn btn-primary mt-3" onClick={() => router.push('/products')}>
            Ir a la tienda
          </button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-end mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Buscar producto..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationPerPage={10}
            highlightOnHover
            striped
            responsive
          />

          <h4 className="text-end mt-4">Total: ₡ {total.toLocaleString()}</h4>
        </>
      )}
    </div>
  );
}
