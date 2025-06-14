'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const axios = useAxios();
  const { login } = useAuth();
  const [mensaje, setMensaje] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);


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
    <div className="d-flex justify-content-center align-items-center vh-100"> {/* centra todo vertical y horizontalmente. */}
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}> {/* tarjeta Bootstrap con sombra y padding. */}
      <h2 className="text-center mb-4">Iniciar Sesión</h2>

      {/* Mensaje de advertencia si es necesario */}
      {mensaje && <div className="alert alert-warning">{mensaje}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <div className="position-relative">
          <input
          type={mostrarPassword ? 'text' : 'password'}
          className="form-control pe-5"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          {/* Botón para mostrar/ocultar contraseña */}
          <button
          type="button"
          className="btn btn-outline-secondary border-0 position-absolute end-0 top-50 translate-middle-y me-2"
          onClick={() => setMostrarPassword(!mostrarPassword)}
          tabIndex={-1}
          >
          {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        </div>

        {/* Mensaje de error si existe */}
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">Entrar</button> { /* la clase w-100 se adapta a pantallas pequeñas como móviles. */}

        {/* Enlace para registrarse */}
        <p className="mt-3 text-center">
        ¿No tienes una cuenta?{' '}
        <a href="/register" className="text-decoration-none">
          Regístrate aquí
        </a>
        </p>
      </form>
      </div>
    </div>
  );
}
