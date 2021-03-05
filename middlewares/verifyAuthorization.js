const { validateToken } = require('../auth/VerifyToken');
const { unauthorized } = require('../utilities/variables');

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const payload = validateToken(authorization);
  if (!payload) return res.status(unauthorized).json({ message: 'jwt malformed' });
  next();
};

module.exports = { verifyAuthorization };