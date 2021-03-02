const JWT = require('jsonwebtoken');

const secret = 'testing json web token';
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '3d',
};

const createToken = (payload) => JWT.sign(payload, secret, jwtConfig);

module.exports = createToken;
