const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = verificarToken;