const { authorizationError } = require('../../utils/error');

const CheckUserCredential = (_req, res, next) => {
  const { decoded, authorId } = res.locals;
  if (decoded.id === authorId || decoded.role === 'admin') {
    return next();
  } 
  return next(authorizationError('missing auth token'));
};

module.exports = CheckUserCredential;