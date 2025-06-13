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

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2>Bienvenido, {user.nombre}</h2>
      <p>Rol: {user.rol}</p>
      <button
        className="btn btn-outline-primary mb-3"
        style={{ marginRight: '15px' }}
        onClick={() => router.push('/products')}
      >
        Ir a la tienda
      </button>
      <button className="btn btn-danger mb-3" onClick={logout}>Cerrar sesión</button>

      {user.rol === 'admin' && (
        <div>
          <Link href="/admin/products" className="btn btn-primary">Gestionar Productos</Link>
        </div>
      )}
    </div>
  );
}
