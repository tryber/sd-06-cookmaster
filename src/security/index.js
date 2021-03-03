const jwt = require('jsonwebtoken');
const securityConfig = require('./configs.security');

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

module.exports = {
  generateToken,
};
