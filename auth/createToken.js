const jwt = require('jsonwebtoken');

const secret = 'segredo';

const jwtConfig = {
  expiresIn: '45m',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

module.exports = { createToken };
