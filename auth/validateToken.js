const jwt = require('jsonwebtoken');

const secret = 'segredo-cookmaster';

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_error) {
    return null;
  }
};

module.exports = validateToken;
