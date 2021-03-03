const jwt = require('jsonwebtoken');
const UsersService = require('./UsersService');

const UNAUTHORIZED = 401;

const secret = 'mysectrettoken';
// JWT secret should not be here,
// but this is not the scope of this project

const jwtHeader = {
  algorithm: 'HS256',
};

async function validateLogin(requestEmail, requestPassword) {
  const user = await UsersService.findByEmail(requestEmail);
  if (!user || user.password !== requestPassword) {
    return {
      error: {
        code: UNAUTHORIZED,
        msg: { message: 'Incorrect username or password' },
      },
    };
  }

  const { password, name, ...userData } = user;
  const payload = { ...userData };
  return jwt.sign(payload, secret, jwtHeader);
}

module.exports = {
  validateLogin,
};
