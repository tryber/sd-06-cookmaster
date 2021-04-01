const validateToken = require('../auth/validateToken');

const ERRO401 = 401;

let payload;

const verifyAuthorization = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(ERRO401).json({ message: 'missing auth token' });

  payload = validateToken(token);

  if (!payload) return res.status(ERRO401).json({ message: 'jwt malformed' });

  next();
};

const getPayload = () => payload;

module.exports = {
  verifyAuthorization,
  getPayload,
};
