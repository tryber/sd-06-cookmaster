const jwt = require('jsonwebtoken');
const UsersService = require('./userService');

const UNAUTHORIZED = 401;

const secret = 'segredo';

const jwtHeader = {
  algorithm: 'HS256',
};

async function validingLogin(pEmail, pPassword) {
  const user = await UsersService.findByEmailService(pEmail);
  if (!user || user.password !== pPassword) {
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
  validingLogin,
};
