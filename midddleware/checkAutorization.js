const validateToken = require('../auth/validateToken');

const checkAuthorization = (req, res, next) => {
  const unauthorized = 401;
  const { authorization: token } = req.headers;
  const payload = validateToken(token);

  if (!payload) return res.status(unauthorized).json({ message: 'jwt malformed' });
  next();
};

module.exports = {
  checkAuthorization,
};
