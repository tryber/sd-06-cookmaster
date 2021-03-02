const AppError = require('../errors/AppError.js');
const { FORBIDDEN } = require('../errors/status');

const errorMsg = 'Only admins can register new admins';

function ensureAdmin(request, _response, next) {
  const { role } = request.user;

  const roleIsAdmin = role === 'admin';

  if (!roleIsAdmin) throw new AppError(errorMsg, FORBIDDEN);

  return next();
}

module.exports = ensureAdmin;
