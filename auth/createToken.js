const jwt = require('jsonwebtoken');

const secret = 'JSONsecretGUSTAVOtrybe2021@';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

module.exports = createToken;
