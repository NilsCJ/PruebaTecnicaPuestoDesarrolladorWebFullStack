# 🛍️ Plataforma E-commerce - Prueba Técnica Full Stack

Este proyecto es una plataforma e-commerce desarrollada como parte de una prueba técnica para el puesto de desarrollador web full stack. Permite a usuarios autenticados agregar productos a un carrito de compras, y a administradores gestionar productos (crear, editar, eliminar) con control de roles, subida de imágenes y autenticación JWT.

---

# 🧰 Tecnologías utilizadas

# Frontend:
- [Next.js 14](https://nextjs.org/)
- React + TypeScript
- Bootstrap 5
- React Context API
- Axios

# Backend:
- Node.js + Express
- JWT para autenticación
- Multer para subida de imágenes
- MySQL como base de datos
- bcryptjs para encriptar contraseñas
- dotenv para manejo de variables de entorno

---

# ⚙️ Requisitos previos

- Node.js v18+
- MySQL Server
- npm

---

# 🛠️ Instrucciones para ejecutar el proyecto

- 🔁 Clonar el repositorio

- Ejecutar los siguientes comandos 
```bash
git clone https://github.com/NilsCJ/PruebaTecnicaPuestoDesarrolladorWebFullStack.git
npm install
```

# 🧱 Crear la base de datos y tablas:
- Importa el archivo db/DBEcommerceZetaSTEAM.sql en tu cliente MySQL (Workbench, DBeaver o CLI) Ruta base de datos: ./db/DBEcommerceZetaSTEAM.sql;


# 🗃️ Crear el archivo .env a partir del archivo .env.example
- PORT=4000
- JWT_SECRET=your_secret_key
- DB_HOST=your_db_host
- DB_USER=your_db_user
- DB_PASSWORD=your_db_password
- DB_NAME=your_db_name


# 🚀 Iniciar el servidor:
Desde la raíz del proyecto ejectua el comando: 
```bash
npx nodemon index.js
```
El servidor estará disponible en http://localhost:4000

# 🌐 Frontend
- 📁 Ir a la carpeta frontend:
```bash
cd frontend
```
- 📦 Instalar dependencias:
```bash
npm install
```

# 🚀 Iniciar el servidor de desarrollo:
```bash
npm run dev
```
- La app estará disponible en http://localhost:3000/login

# 🧾 Detalles de la base de datos
- El archivo db/DBEcommerceZetaSTEAM.sql contiene:

Creación de la base de datos

Tablas:

users (usuarios con roles admin o user)

products (productos con imagen, descripción, precio)

cart_items (productos en carrito por usuario)

# 🧪 Acceso y prueba
Crear usuario en http://localhost:4000/api/auth/register o desde frontend

Iniciar sesión como admin para acceder a /admin/products

# Usuario autenticado puede:

Agregar al carrito

Acceso a mantenimiento productos, solo si es admin

# 📦 Puntos Importantes
Las imágenes se almacenan en el backend dentro de la carpeta uploads

El sistema utiliza JWT para proteger rutas tanto en frontend como en backend