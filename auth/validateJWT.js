const jwt = require('jsonwebtoken');
const UsersService = require('../services/UsersService');

const UNAUTHORIZED = 401;

const secret = 'mysectrettoken';

const missingTokenErrorObject = {
  code: UNAUTHORIZED,
  errorMessage: { message: 'missing auth token' },
};

const invalidTokenErrorObject = {
  code: UNAUTHORIZED,
  errorMessage: { message: 'jwt malformed' },
};

async function validateJWT(request, response, next) {
  const token = request.headers.authorization;
  if (!token) {
    next(missingTokenErrorObject);
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UsersService.findByEmail(decoded.email);

    if (!user) {
      next(invalidTokenErrorObject);
    }
    
    request.user = user;
    next();
  } catch (err) {
    next(invalidTokenErrorObject);
  }
}

module.exports = validateJWT;
