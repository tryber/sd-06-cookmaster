const jwt = require('jsonwebtoken');

const secret = 'trybeehtop';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = async (obj) => {
  const token = jwt.sign({ data: obj }, secret, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};
