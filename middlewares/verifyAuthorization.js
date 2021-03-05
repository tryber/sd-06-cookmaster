const validateToken = require('../services/auth/validateToken');

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  const payload = validateToken(authorization);

  if (!payload) return response.status(200).json({ message: 'Não autorizado!' });

  next();
};