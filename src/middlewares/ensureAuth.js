const { verify } = require('jsonwebtoken');

const { session } = require('../config/auth');
const AppError = require('../utils/AppError');

const { UNAUTHORIZED } = require('../utils/errorStatus');

function ensureAuth(req, _res, next) {
  const token = req.headers.authorization;

  if (!token) throw new AppError('missing auth token', UNAUTHORIZED);

  try {
    const decoded = verify(token, session.secret);

    const { id, email, role } = decoded;

    req.user = { id, email, role };

    return next();
  } catch (error) {
    throw new AppError('jwt malformed', UNAUTHORIZED);
  }
}

module.exports = ensureAuth;
