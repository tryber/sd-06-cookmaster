const jwt = require('jsonwebtoken');

const secret = 'secretToken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (email, password) => {
  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};
