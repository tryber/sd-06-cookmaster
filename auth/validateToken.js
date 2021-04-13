const jwt = require('jsonwebtoken');

const secret = '1234chef';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};
