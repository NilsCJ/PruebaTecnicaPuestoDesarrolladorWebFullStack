'use client';
import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { showConfirm, showSuccess, showError } from '../utils/alerts';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export default function ProductsPage() {
  const [cartCount, setCartCount] = useState(0);
  const axios = useAxios();
  const { user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 10;

  useEffect(() => {
    fetchProducts();
    fetchCartCount();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (err: any) {
      setError('Error al obtener productos');
    }
  };
  const fetchCartCount = async () => { //Función para obtener el conteo del carrito
    if (!user)return;
    try {
        const res = await axios.get('/cart');
        const total = res.data.reduce((sum: number, item: any) => sum + item.cantidad, 0);
        setCartCount(total);
    } catch (err) {
        console.error('Error al obtener carrito');
    }
  };


  const handleAddToCart = async (product_id: number) => {
    if (!user) return router.push('/login');

    try {
        await axios.post('/cart/add', { product_id });
            setCartCount(cartCount + 1); //suma inmediata
            showSuccess('Producto agregado al carrito');
    } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.error || 'Error al agregar al carrito');
    }

  };

    const handleRedirectToCart = () => {
    if (!user) {
        localStorage.setItem('redirectAfterLogin', '/cart');
        return router.push('/login');
    }

    router.push('/cart');
    };


  const productosFiltrados = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(productosFiltrados.length / productosPorPagina);
  const inicio = (currentPage - 1) * productosPorPagina;
  const productosPaginados = productosFiltrados.slice(inicio, inicio + productosPorPagina);

  return (
    <div className="container mt-4">
      <h2>Productos</h2>

    <div className="row align-items-center my-3">
        <div className="col-md-8">
            <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
            }}
            />
        </div>
        <div className="col-md-4 text-end mt-2 mt-md-0">
            <button className="btn btn-primary position-relative" onClick={handleRedirectToCart}>
                Ver carrito
                {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                    </span>
                )}
            </button>
        </div>
    </div>


      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {productosPaginados.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100">
              <img src={`http://localhost:4000${p.imagen}`} className="card-img-top" alt={p.nombre} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">{p.descripcion}</p>
                <p className="card-text fw-bold">₡ {p.precio}</p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => handleAddToCart(p.id)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
