const jwt = require('jsonwebtoken');

const secret = 'segredo';

const validateToken = (token) => {
  try {
    jwt.decode(token, secret);
  } catch (_error) {
    return null;
  }
};

module.exports = { validateToken };