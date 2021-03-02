const validateToken = require('../auth/validateToken');

const ERRO401 = 401;

const verifyAuthorization = (req, res, next) => {
  const { authorization: token } = req.headers;

  const payload = validateToken(token);
  console.log(payload);

  if (!payload) return res.status(ERRO401).json({ message: 'jwt malformed' });

  next();
};

module.exports = verifyAuthorization;
