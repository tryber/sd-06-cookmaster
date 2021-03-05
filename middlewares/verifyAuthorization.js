const validateToken = require('../auth/ValidateToken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const payload = validateToken(authorization);
  console.log(payload)
  if (!payload) return res.status(401).json({ message: 'jwt malformed' });

  next();
};
