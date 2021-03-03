const validateToken = require('../auth/ValidateToken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const payload = validateToken(authorization);

  if (!payload) return res.status(200).json({ message: 'Não autorizado!' });

  next();
};
