const validateToken = require('../JWT/validateToken');

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  const payload = validateToken(authorization);

  if (!payload) return res.status(401).json({ message: 'jwt malformed' });

  next();
};

module.exports = {
  verifyAuthorization,
};
