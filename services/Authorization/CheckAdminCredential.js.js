const { authorizationAdminError } = require('../../utils/error');

const CheckAdminCredential = (_req, res, next) => {
  const { decoded } = res.locals;
  if (decoded.role === 'admin') {
    return next();
  } 
  return next(authorizationAdminError('Only admins can register new admins'));
};

module.exports = CheckAdminCredential; 
