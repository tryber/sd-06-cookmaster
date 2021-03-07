const jwt = require('jsonwebtoken');

const secret = 'segredo-secreto';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const newToken = async (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

module.exports = newToken;
