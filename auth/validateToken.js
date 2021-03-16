const jwt = require('jsonwebtoken');

const secret = 'JSONsecretGUSTAVOtrybe2021@';

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_err) {
    return null;
  }
};

module.exports = validateToken;
