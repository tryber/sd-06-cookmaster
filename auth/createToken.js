const jwt = require('jsonwebtoken');

const SECRET = 'projetoCookmaster';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

// Payload é o que vem no corpo do nosso login!
const createToken = (payload) => {
  const token = jwt.sign(payload, SECRET, headers);

  return token;
};

module.exports = createToken;
