const jwt = require('jsonwebtoken');

const secret = 'changeme123';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};
