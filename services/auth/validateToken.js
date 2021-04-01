const jwt = require('jsonwebtoken');

const secret = 'umgato';

module.exports = (token) => {
  try {
    const newtoken = jwt.decode(token, secret);
    return newtoken;
  } catch (e) {
    return null;
  }
};