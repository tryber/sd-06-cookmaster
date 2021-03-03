const jwt = require('jsonwebtoken');

const secret = 'segredo-cookmaster';

const headers = {
  algorithm: 'HS256',
  expiresIn: '3d',
};

const createToken = (payload) => jwt.sign(payload, secret, headers);

module.exports = createToken;