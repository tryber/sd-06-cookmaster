const jwt = require('jsonwebtoken');

const secret = 'segredo-aplicacao';

const validateToken = (token) => {
  const result = jwt.decode(token, secret);
  
  return result;
};

module.exports = {
  validateToken,
};
