const jwt = require('jsonwebtoken');

const secret = 'fr4s3d3s3gur4nc4';

// link que me ajudou a entender a validação do token e construir este código:
// https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/

// agradecimento especial ao Thiago que me ajudou a recuperar corretamente o id do usuário no plantão! <3

// finalmente corrigindo a validação do token, usando o mesmo modo que usei no blogs api

function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    console.log('DEODED VALIDATE TOKEN', decoded);
    const id = '_id';
    req.userId = decoded[id];
    req.userRole = decoded.role;
    next();
  });
}

module.exports = validateToken;
