const JWT = require('jsonwebtoken');

const secret = 'testing json web token';

const validateToken = (token) => {
  try {
    return JWT.verify(token, secret);
  } catch (err) {
    return null;
  }
};

module.exports = validateToken;
