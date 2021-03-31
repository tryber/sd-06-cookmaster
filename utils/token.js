const jwt = require('jsonwebtoken');

const secret = 'root';

const headers = {
  algorithm: 'HS256',
  expiresIn: 30000,
};

const createToken = (paylod) => {
  const token = jwt.sign(paylod, secret, headers);
  return token;
};

const validateToken = (token) => {
  const isTokenValid = jwt.verify(token, secret, (err, decoded) => {
    if (err) return err;
    return decoded;
  });

  return isTokenValid;
};

module.exports = {
  createToken,
  validateToken,
};
