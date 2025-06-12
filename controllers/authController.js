const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { nombre, email, password, rol } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, email, hashedPassword, rol || 'user'], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario registrado correctamente' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

    const user = results[0];

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, nombre: user.nombre, rol: user.rol } });
  });
};
