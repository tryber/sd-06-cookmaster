const jwt = require('jsonwebtoken');

const secret = 'segredo';

const headers = {
  algorithm: 'HS264',
  expiredIn: '7d',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};

module.exports = createToken;
