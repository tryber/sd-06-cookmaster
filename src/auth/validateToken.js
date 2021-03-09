const jwt = require('jsonwebtoken');

const secret = 'segredo-aplicacao';

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};

module.exports = {
  validateToken,
};
