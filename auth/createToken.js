const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET } = dotenv.parsed;

const headers = {
  algorithm: 'HS256',
  expiresIn: 30000,
};

const createToken = (paylod) => {
  const token = jwt.sign(paylod, SECRET, headers);
  return token;
};

console.log(createToken({ nome: 'lucas' }));