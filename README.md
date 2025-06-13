# PruebaTecnicaPuestoDesarrolladorWebFullStack
Plataforma Ecommerce Creado por Nils Carrillo

## Configuración del entorno

1. Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

2. Completa los valores requeridos en `.env` antes de iniciar la aplicación.

## Instalación de dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar las dependencias del backend:

```bash
npm install
```

## Inicio del backend

Para iniciar el servidor Express ejecuta:

```bash
npm start
```

El backend se ejecutará en `http://localhost:4000` (o en el puerto definido en la variable `PORT`) y las rutas de la API utilizan el prefijo `/api`.

## Ejecución del frontend

Dentro de la carpeta `frontend` instala las dependencias y levanta el entorno de desarrollo de Next.js:

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:3000`.

## Variables de entorno y URLs de la API

El archivo `.env` debe contener las siguientes variables (consulta `.env.example`):

```env
PORT=4000
JWT_SECRET=your_secret_key
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

El frontend utiliza `http://localhost:4000/api` como URL base para comunicarse con el backend (ver `frontend/src/app/hooks/useAxios.ts`). Si cambias el puerto del backend, actualiza esta URL en consecuencia.