const jwt = require('jsonwebtoken');

const secret = 'mysecret';

module.exports = (payload) => {
  const headers = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, headers);
};
