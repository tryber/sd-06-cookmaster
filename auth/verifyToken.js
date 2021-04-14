const jwt = require('jsonwebtoken');

const SECRET = 'projetoCookmaster';

const verifyToken = (authorization) => {
  const payload = jwt.verify(authorization, SECRET);
  return payload;
};

module.exports = verifyToken;
