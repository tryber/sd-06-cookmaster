const { authorizationError } = require('../../utils/error');

const CheckCredentials = (_req, res, next) => {
  const { decoded, authorId } = res.locals;
  if (decoded.id === authorId || decoded.role === 'admin') {
    return next();
  } 
  return next(authorizationError('missing auth token'));
};

module.exports = CheckCredentials;