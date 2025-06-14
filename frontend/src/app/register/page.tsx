'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importamos iconos para mostrar/ocultar contraseña
import { showSuccess, showError, showConfirm } from '../utils/alerts'; // Importamos SweetAlert2 para mostrar mensajes de alerta

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();
  const axios = useAxios();
  const { login } = useAuth();
  const [rol, setRol] = useState('user');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'user', // predeterminado
  });



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.nombre || !form.email || !form.password) {
        return setError('Todos los campos son obligatorios');
        }

        try {
        await axios.post('/auth/register', form);

        const res = await axios.post('/auth/login', { email: form.email, password: form.password });
        login(res.data.user, res.data.token);

        const destino = localStorage.getItem('redirectAfterLogin') || '/dashboard';
        localStorage.removeItem('redirectAfterLogin');
        showSuccess('Usuario registrado correctamente');
        router.push(destino);
        } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.error || 'Error al registrar usuario');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value }); //Esta función hace que todos tus inputs funcionen dinámicamente según el name
    };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Registrarse</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
                type="text"
                name="nombre"
                className="form-control"
                required
                value={form.nombre}
                onChange={handleChange}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
                type="email"
                name="email"
                className="form-control"
                required
                value={form.email}
                onChange={handleChange}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="position-relative">
                <input
                type={mostrarPassword ? 'text' : 'password'}
                name="password"
                className="form-control pe-5"
                required
                value={form.password}
                onChange={handleChange}
                />
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

            <div className="form-check form-switch mb-3">
            <input
                className="form-check-input"
                type="checkbox"
                id="rolSwitch"
                checked={form.rol === 'admin'}
                onChange={(e) =>
                setForm({ ...form, rol: e.target.checked ? 'admin' : 'user' })
                }
            />
            <label className="form-check-label" htmlFor="rolSwitch">
                ¿Registrar como administrador?
            </label>
            </div>

            <button type="submit" className="btn btn-success w-100">Registrarse</button>

            <p className="mt-3 text-center">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-decoration-none">Inicia sesión aquí</a>
            </p>
        </form>
        </div>
    </div>
    );

}
