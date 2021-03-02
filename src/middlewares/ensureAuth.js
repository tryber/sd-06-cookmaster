const jwt = require('jsonwebtoken');

const AppError = require('../errors/AppError.js');
const { UNAUTHORIZED } = require('../errors/status');
const authConfig = require('../config/auth.js');

const errorMsg = 'Invalid entries. Try again.';
const invalidJWT = 'jwt malformed';

function ensureAuth(request, response, next) {
  const token = request.headers.authorization;

  if (!token) throw new AppError(errorMsg);

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret);

    const { email, role, id } = decoded;

    request.user = { id, role, email };

    return next();
  } catch {
    throw new AppError(invalidJWT, UNAUTHORIZED);
  }
}

module.exports = ensureAuth;
