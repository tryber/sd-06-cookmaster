const jwt = require('jsonwebtoken');
const { authorizationError } = require('../../utils/error');

const VerifyUserToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(authorizationError('jwt malformed'));
  }  
  jwt.verify(authHeader, 'aroldinho', (err, decoded) => {
    if (err) {
      return next(authorizationError('jwt malformed'));
    } 
      const { email, id, role } = decoded;
      res.locals.decoded = { email, id, role };
        next();
  });
};

module.exports = VerifyUserToken;