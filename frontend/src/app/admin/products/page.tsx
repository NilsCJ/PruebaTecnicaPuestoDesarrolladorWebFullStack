'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import useAxios from '../../hooks/useAxios';
import DataTable from 'react-data-table-component';
import { showConfirm, showSuccess, showError } from '../../utils/alerts';

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
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [filtro, setFiltro] = useState('');
  const productsFiltered = products.filter((p) => {
  const texto = `${p.nombre} ${p.descripcion} ${p.precio}`.toLowerCase();
    return texto.includes(filtro.toLowerCase()); //Convertimos a minúsculas para evitar problemas de mayúsculas/minúsculas
  });




  useEffect(() => {
    if (!user || user.rol !== 'admin') router.push('/login');
    else fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    const res = await axios.get('/products');
    setProducts(res.data);
  };

  const columns = (handleEdit: any, handleDelete: any) => [
  {
      name: 'Imagen',
      selector: (row: any) => row.imagen,
      cell: (row: any) => (
        <img src={`http://localhost:4000${row.imagen}`} width="60" alt="producto" />
      ),
      sortable: false,
    },
    {
      name: 'Nombre',
      selector: (row: any) => row.nombre,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: (row: any) => row.descripcion,
      sortable: false,
    },
    {
      name: 'Precio',
      selector: (row: any) => `₡ ${row.precio}`,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row: any) => (
        <>
          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(row)}>Editar</button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.id)}>Eliminar</button>
        </>
      ),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.nombre || !form.descripcion || !form.precio || (!imagen && !editingId)) { //Creamos las validaciones
    return showError('Todos los campos son obligatorios y válidos'); 
  }



  const data = new FormData();
  data.append('nombre', form.nombre);
  data.append('descripcion', form.descripcion);
  data.append('precio', form.precio.toString());
  if (imagen) data.append('imagen', imagen);

  try {
    if (editingId) {
      await axios.put(`/products/${editingId}`, data);
      showSuccess('Producto editado correctamente');
    } else {
      await axios.post('/products', data);
      showSuccess('Producto guardado correctamente');
    }

    setForm({ nombre: '', descripcion: '', precio: 0, imagen: '' });
    setImagen(null);
    setEditingId(null);
    setError('');
    fetchProducts();
  } catch (err: any) {
    console.error(err);
    setError(err.response?.data?.error || err.message || 'Error al guardar producto');

  }
 };


  const handleEdit = (product: Product) => {
    setForm({ ...product });
    setEditingId(product.id);
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirm('¿Deseas eliminar este producto?');

    if (!confirmed) return;

    try {
      await axios.delete(`/products/${id}`);
      fetchProducts();
      showSuccess('Producto eliminado correctamente');
    } catch (err: any) {
      showError(err.response?.data?.error || 'Error al eliminar');
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
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#343a40', // color gris oscuro tipo Bootstrap dark
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '15px',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        minHeight: '60px',
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #dee2e6',
        paddingTop: '10px',
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
    },
  };


  


  return (
    <div className="container mt-4">
      <h2>Gestión de Productos</h2>

      <form onSubmit={handleSubmit} className="mb-4 col-md-6">
        <div className="mb-2">
          <input type="text" name="nombre" className={`form-control`} placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        </div>
        {form.nombre.trim() === '' && (
          <div className="invalid-feedback">El nombre es obligatorio</div>
        )}
        <div className="mb-2">
          <textarea name="descripcion" className="form-control" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <input type="number" name="precio" className={`form-control`} value={form.precio || ''} placeholder="Precio" onChange={handleChange} />
        </div>
        {form.precio <= 0 && (
          <div className="invalid-feedback">El precio debe ser mayor a 0</div>
        )}
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
      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={productsFiltered}
        pagination
        responsive
        highlightOnHover
        striped
        noDataComponent="No hay productos disponibles"
        customStyles={customStyles}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            className="form-control w-25"
            placeholder="Buscar productos..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        }
      />

    </div>
  );
}
