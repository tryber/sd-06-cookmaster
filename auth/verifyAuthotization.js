const { validateToken } = require('./validateToken');

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  const payload = validateToken(authorization);

  if (!payload) return res.status(500).json({ message: 'Não autorizado' });

  next();
};

module.exports = {
  verifyAuthorization,
};
