'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useAxios from '../hooks/useAxios';
import { useRouter } from 'next/navigation';

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

  return (
    <div className="container mt-4">
      <h2>Mi carrito</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td><img src={`http://localhost:4000${item.imagen}`} width={60} /></td>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>₡ {item.precio}</td>
                  <td>₡ {item.precio * item.cantidad}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ₡ {total}</h4>
        </>
      )}
    </div>
  );
}
