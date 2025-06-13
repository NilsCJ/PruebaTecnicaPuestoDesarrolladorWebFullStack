'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();
  const axios = useAxios();
  const { login } = useAuth();
  const [rol, setRol] = useState('user');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      return setError('Todos los campos son obligatorios');
    }

    try {
      await axios.post('/auth/register', { nombre, email, password });

      const res = await axios.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);

      const destino = localStorage.getItem('redirectAfterLogin') || '/dashboard';
      localStorage.removeItem('redirectAfterLogin');
      router.push(destino);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Error al registrar usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <form onSubmit={handleSubmit} className="col-md-5">
        <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
        </div>

        <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>

        <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
        <div className="form-check form-switch mb-3">
            <input
                className="form-check-input"
                type="checkbox"
                id="switchRol"
                checked={rol === 'admin'}
                onChange={() => setRol(rol === 'user' ? 'admin' : 'user')}
            />
            <label className="form-check-label" htmlFor="switchRol">
                Registrarse como administrador
            </label>
        </div>


        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
}
