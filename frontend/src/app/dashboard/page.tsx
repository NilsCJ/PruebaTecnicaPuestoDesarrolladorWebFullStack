'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  if (!user) return(
    /* Vamos a  utilizar un spinning de bootstrap para mostrar el mensaje cargando*/
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando sesión...</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2>Bienvenido, {user.nombre}</h2>
      <p>Rol: {user.rol}</p>

      <div className="mb-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => router.push('/products')}
        >
          Ir a la tienda
        </button>

        <button
          className="btn btn-outline-success me-2"
          onClick={() => router.push('/cart')}
        >
          Ver carrito
        </button>

        <button className="btn btn-danger" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      {user.rol === 'admin' && (
        <div>
          <Link href="/admin/products" className="btn btn-primary">
            Gestionar Productos
          </Link>
        </div>
      )}
    </div>
  );
}
