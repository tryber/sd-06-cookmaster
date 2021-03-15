const jwt = require('jsonwebtoken');

const secret = 'segredoLoginTokenJwt';

const validateToken = (token) => {
  try {
    const validatedToken = jwt.verify(token, secret);
    return validatedToken;
  } catch (_err) {
    return null;
  }
};

module.exports = validateToken;
