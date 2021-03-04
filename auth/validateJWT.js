const jwt = require('jsonwebtoken');
const UsersService = require('../services/UsersService');

const UNAUTHORIZED = 401;

const secret = 'mysectrettoken';

async function validateJWT(request, response, next) {
  const token = request.headers.authorization;
  console.log('Header token', token);
  if (!token) {
    return response.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }

  const decoded = jwt.verify(token, secret);
    const user = await UsersService.findByEmail(decoded.email);
    if (!user) {
      return response.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
    request.user = user;
    next();
}

module.exports = validateJWT;
