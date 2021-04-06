const validateToken = require('../auth/validateToken');

const statusUnauthorized = 401;

const verifyAuthorization = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(statusUnauthorized).json({ message: 'missing auth token' });

  const payload = validateToken(token);
  
  const { role = '' } = payload;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  if (!payload) return res.status(statusUnauthorized).json({ message: 'jwt malformed' });

  next();
};

module.exports = verifyAuthorization;
