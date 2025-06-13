'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import useAxios from '../../hooks/useAxios';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export default function ProductsAdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const axios = useAxios();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, 'id'>>({ nombre: '', descripcion: '', precio: 0, imagen: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);


  useEffect(() => {
    if (!user || user.rol !== 'admin') router.push('/login');
    else fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    const res = await axios.get('/products');
    setProducts(res.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.nombre || !form.descripcion || !form.precio || (!imagen && !editingId)) {
    return setError('Todos los campos son obligatorios');
  }

  const data = new FormData();
  data.append('nombre', form.nombre);
  data.append('descripcion', form.descripcion);
  data.append('precio', form.precio.toString());
  if (imagen) data.append('imagen', imagen);

  try {
    if (editingId) {
      await axios.put(`/products/${editingId}`, data);
    } else {
      await axios.post('/products', data);
    }

    setForm({ nombre: '', descripcion: '', precio: 0, imagen: '' });
    setImagen(null);
    setEditingId(null);
    setError('');
    fetchProducts();
  } catch (err: any) {
    setError(err.response?.data?.error || 'Error al guardar producto');
  }
 };


  const handleEdit = (product: Product) => {
    setForm({ ...product });
    setEditingId(product.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar este producto?')) {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setImagen(file);
    } else {
        setError('Solo se permiten imágenes .jpg, .jpeg, .png');
    }
  };

  


  return (
    <div className="container mt-4">
      <h2>Gestión de Productos</h2>

      <form onSubmit={handleSubmit} className="mb-4 col-md-6">
        <div className="mb-2">
          <input type="text" name="nombre" className="form-control" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <textarea name="descripcion" className="form-control" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <input type="number" name="precio" className="form-control" placeholder="Precio" value={form.precio} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success">
          {editingId ? 'Actualizar' : 'Crear'} Producto
        </button>
        {editingId && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => {
            setForm({ nombre: '', descripcion: '', precio: 0, imagen: '' });
            setEditingId(null);
            setError('');
          }}>
            Cancelar
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td><img src={`http://localhost:4000${p.imagen}`} alt={p.nombre} width="60" /></td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>₡ {p.precio}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
