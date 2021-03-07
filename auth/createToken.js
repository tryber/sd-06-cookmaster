// como visto na aula 28.1 
const jwt = require('jsonwebtoken');

const secret = 'ofFrenchCuisineIsButterAndButter';

const headers = {
  algorithm: 'HS256',
  expiresIn: '5d',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};

module.exports = createToken;