const rescue = require('express-rescue');

const { UNAUTHORIZED } = require('../utils/statusCodeHandler');
const { validateToken } = require('../utils/token');

const verifyToken = rescue(async (request, response, next) => {
  const token = request.headers.authorization;
  const auth = validateToken(token);

  if (auth.err || !token) {
    return response
      .status(UNAUTHORIZED.code)
      .json({ message: 'jwt malformed' });
  }

  request.auth = auth;

  next();
});

module.exports = {
  verifyToken,
};
