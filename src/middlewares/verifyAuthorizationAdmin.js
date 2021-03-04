const validateToken = require('../auth/validateToken');

const UNAUTH = 403;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const payload = validateToken(authorization);

  if (!payload) return res.status(UNAUTH).json({ message: 'jwt malformed' });

  if (payload.role !== 'admin') {
    return res.status(UNAUTH).json({
    message: 'Only admins can register new admins',
    });
  }

  next();
};
