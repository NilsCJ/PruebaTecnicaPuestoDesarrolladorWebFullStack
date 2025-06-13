const db = require('../models/db');

exports.getCart = (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT ci.id, p.nombre, p.precio, ci.cantidad, p.imagen
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { product_id, cantidad } = req.body;

  if (!product_id) return res.status(400).json({ error: 'Producto requerido' });

  const sql = `
    INSERT INTO cart_items (user_id, product_id, cantidad)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE cantidad = cantidad + ?
  `;
  db.query(sql, [userId, product_id, cantidad || 1, cantidad || 1], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto agregado al carrito' });
  });
};

exports.removeFromCart = (req, res) => {
  const cartItemId = req.params.id;
  const userId = req.user.id;
  const sql = 'DELETE FROM cart_items WHERE id = ? AND user_id = ?';
  db.query(sql, [cartItemId, userId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto eliminado del carrito' });
  });
};
