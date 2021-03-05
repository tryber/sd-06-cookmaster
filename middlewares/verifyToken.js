const verifyToken = require('../authorization/validate');

const STATUS_401 = 401;
const ERR_MESSAGE_TOKEN = { message: 'jwt malformed' };

const verifyAuth = (request, response, next) => {
  const { authorization } = request.headers;
  const payload = verifyToken(authorization);
  if (!payload) return response.status(STATUS_401).json(ERR_MESSAGE_TOKEN);
  next();
};

module.exports = verifyAuth;
