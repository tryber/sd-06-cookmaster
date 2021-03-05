const jwt = require('jsonwebtoken');

const secret = 'umgato';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};