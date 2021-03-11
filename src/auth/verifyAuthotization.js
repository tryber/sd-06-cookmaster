const { validateToken } = require('./validateToken');

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'missing auth token' });

  const payload = validateToken(authorization);

  if (!payload) return res.status(401).json({ message: 'jwt malformed' });

  next();
};

module.exports = {
  verifyAuthorization,
};
