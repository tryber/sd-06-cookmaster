const jwt = require('jsonwebtoken');

const secret = 'IDontKnow';
const jwtConfig = {
  expiresIn: '999999d',
  algorithm: 'HS256',
};

module.exports = (user) => jwt.sign({ data: user }, secret, jwtConfig);
