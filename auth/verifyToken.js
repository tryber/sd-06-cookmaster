const jwt = require('jsonwebtoken');

const secret = 'tioRamirez012345';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};
