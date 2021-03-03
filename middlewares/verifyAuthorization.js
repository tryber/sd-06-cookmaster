const { validateToken } = require('../auth/VerifyToken');
const { internalError } = require('../utilities/variables');

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const payload = validateToken(authorization);
  if (!payload) return res.status(internalError).json({ message: 'Não autorizado' });
  next();
};

module.exports = { verifyAuthorization };