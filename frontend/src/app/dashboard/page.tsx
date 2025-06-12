'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

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
      <button className="btn btn-danger" onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
