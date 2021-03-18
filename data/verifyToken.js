const jwt = require('jsonwebtoken');

const secret = 'IDontKnow';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return err;
  }
};
