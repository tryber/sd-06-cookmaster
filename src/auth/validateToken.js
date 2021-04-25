const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};
