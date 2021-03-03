const jwt = require('jsonwebtoken');

const secret = 'segredoLoginTokenJwt';
const headers = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (payload) => {
  const newToken = jwt.sign(payload, secret, headers);
  return newToken;
};

module.exports = createToken;
