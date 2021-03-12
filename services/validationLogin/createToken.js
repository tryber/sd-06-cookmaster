const jwt = require('jsonwebtoken');

const secret = 'secretToken';

const jwtSetup = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtSetup);

module.exports = createToken;