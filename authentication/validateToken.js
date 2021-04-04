const jwt = require('jsonwebtoken');
require('dotenv').config();

// link que me ajudou a entender a validação do token e construir este código:
// https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/

function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'jwt malformed' });
    const id = '_id';
    req.userId = decoded[id];
    next();
  });
}

module.exports = validateToken;
