const jwt = require('jsonwebtoken');
const UsersService = require('../service/userService');

const UNAUTHORIZED = 401;

const secret = 'segredo';

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
  console.log('passou', token);
  if (!token) {
    next(missingTokenErrorObject);
  }
  try {
    const decoded = jwt.verify(token, secret);
    console.log('user', decoded);
    const user = await UsersService.findByEmailService(decoded.email);
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
