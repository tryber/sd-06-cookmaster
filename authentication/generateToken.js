const jwt = require('jsonwebtoken');

const secret = 'Frase Super Secreta';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

const generateToken = (payload) => jwt.sign(payload, secret, jwtConfig);

module.exports = generateToken;
