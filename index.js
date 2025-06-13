const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
