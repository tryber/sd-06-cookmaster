const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = 'fr4s3d3s3gur4nc4';

// link que me ajudou a entender a validação do token e construir este código:
// https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/

function validateToken(req, res, next) {
  console.log('REQ NO VALIDATE TOKEN', req.userIdLogin);
  console.log('BODY NO VALIDATE TOKEN', req.body);
  console.log('USER ID NO VALIDATE TOKEN', req.userIdLogin);
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    console.log('DECODED', decoded);
    if (err) return res.status(401).json({ message: 'jwt malformed' });
    const id = '_id';
    req.userId = decoded[id];
    next();
  });
}

module.exports = validateToken;
