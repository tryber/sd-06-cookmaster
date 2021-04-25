const validateToken = require('../auth/validateToken');

const UNAUTH = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const payload = validateToken(authorization);

  if (!payload) return res.status(UNAUTH).json({ message: 'jwt malformed' });

  next();
};
