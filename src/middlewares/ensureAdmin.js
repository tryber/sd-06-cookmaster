const AppError = require('../utils/AppError');

const { FORBIDDEN } = require('../utils/errorStatus');

function ensureAuth(req, _res, next) {
  const { role } = req.user;

  if (role !== 'admin') throw new AppError('Only admins can register new admins', FORBIDDEN);

  return next();
}

module.exports = ensureAuth;
