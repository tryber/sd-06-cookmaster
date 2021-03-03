const jwt = require('jsonwebtoken');

const secret = 'SuperClaytão123';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};
