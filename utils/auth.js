const jwt = require('jsonwebtoken');

const secret = 'projectcookmasterv2';

const createToken = (payload) => {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, headers);

  return token;
};

module.exports = { createToken, secret };
