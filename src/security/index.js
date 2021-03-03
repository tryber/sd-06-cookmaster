const jwt = require('jsonwebtoken');
const securityConfig = require('./configs.security');
const handleErrorMessage = require('../utils/dictionary/handleErrorMessage');

const generateToken = ({ _id, email, role }) => {
  const payload = {
    iss: 'cookmaster-api',
    aud: 'cookmaster-api',
    sub: _id,
    email,
    role,
  };

  return jwt.sign(payload, securityConfig.jwt.secret, securityConfig.jwt.options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, securityConfig.jwt.secret);
  } catch (err) {
    throw new Error(handleErrorMessage(err.message, 401));
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
