const validateToken = require('../Auth/validateToken');

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  const payload = validateToken(authorization);
  if (!payload) return res.status(200).json({ message: 'Não Autorizado ou não é administrador' });

  next();
};

module.exports = verifyAuthorization;
