const jwt = require('jsonwebtoken');

const secret = 'segredo-secreto';

const UNAUTHORIZED = 401;

async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decodedToken = jwt.verify(authorization, secret);
    req.user = decodedToken.user;
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
  
  next();
}

module.exports = {
  validateToken,
};
