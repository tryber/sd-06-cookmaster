const jwt = require('jsonwebtoken');

const secret = 'token-secret-created';

async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const tokenDeciphered = jwt.verify(authorization, secret);
    req.user = tokenDeciphered.user;
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  
  next();
}

module.exports = {
  tokenValidation,
};