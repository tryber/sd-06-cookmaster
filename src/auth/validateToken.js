const jwt = require('jsonwebtoken');

const secret = 'projectCookmaster';

const validateToken = async (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_e) {
    return null;
  }
};

module.exports = {
  validateToken,
};
