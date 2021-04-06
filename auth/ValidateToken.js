const jwt = require('jsonwebtoken');

const secret = 'mysecret';

module.exports = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log(err);
  }
};
