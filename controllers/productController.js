const db = require('../models/db');

exports.create = (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagen = req.file?.filename;

  if (!nombre || !descripcion || !precio || !imagen) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = 'INSERT INTO products (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion, precio, `/uploads/${imagen}`], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto creado correctamente' });
  });
};


exports.getAll = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getOne = (req, res) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(results[0]);
  });
};

exports.update = (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagen = req.file?.filename ? `/uploads/${req.file.filename}` : null;

  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = imagen
    ? 'UPDATE products SET nombre = ?, descripcion = ?, precio = ?, imagen = ? WHERE id = ?'
    : 'UPDATE products SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?';

  const params = imagen
    ? [nombre, descripcion, precio, imagen, req.params.id]
    : [nombre, descripcion, precio, req.params.id];

  db.query(query, params, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto actualizado correctamente' });
  });
};


exports.remove = (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto eliminado correctamente' });
  });
};
