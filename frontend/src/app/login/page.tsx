'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const axios = useAxios();
  const { login } = useAuth();
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
  const destino = localStorage.getItem('redirectAfterLogin');
  if (destino) {
    setMensaje('Debes iniciar sesión para continuar');
  }
}, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      const destiny = localStorage.getItem('redirectAfterLogin') || '/dashboard';
      localStorage.removeItem('redirectAfterLogin'); // limpia el localStorage
      router.push(destiny);

    } catch (err: any) {
      setError(err.response?.data?.error || 'Error de inicio de sesión');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {mensaje && <div className="alert alert-warning">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="col-md-4">
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}
