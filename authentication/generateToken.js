const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

const generateToken = (payload) => jwt.sign(payload, process.env.SECRET, jwtConfig);

module.exports = generateToken;
