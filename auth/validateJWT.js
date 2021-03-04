const jwt = require('jsonwebtoken');
const UsersService = require('../services/UsersService');

const UNAUTHORIZED = 401;

const secret = 'mysectrettoken';

const errorObject = {
  code: UNAUTHORIZED,
  errorMessage: { message: 'jwt malformed' },
};

async function validateJWT(request, response, next) {
  const token = request.headers.authorization;
  if (!token) {
    next(errorObject);
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UsersService.findByEmail(decoded.email);
    if (!user) {
      next(errorObject);
    }
    request.user = user;
    next();
  } catch (err) {
    next(errorObject);
  }
}

module.exports = validateJWT;
