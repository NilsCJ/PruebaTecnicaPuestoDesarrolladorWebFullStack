const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.rol !== role) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };
};
