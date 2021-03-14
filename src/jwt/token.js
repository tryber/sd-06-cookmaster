const jwt = require('jsonwebtoken');

const secret = 'segredo-secreto';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const newToken = async (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

const decodeToken = async (token) => {
  const decodedToken = jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    return 'jwt malformed';
  }
    return decoded;
  });
  return decodedToken;
};

module.exports = {
  newToken,
  decodeToken,
};
