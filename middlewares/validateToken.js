const jwt = require('jsonwebtoken');

const validadeToken = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = 'q1w2e3r4t5';

  try {
    console.log(401);
    jwt.verify(token, secret);
  } catch {
    return res.status(401).send({ message: 'jwt malformed' });
  }

  return next();
};

const validadeTokenPut = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'missing auth token' });
  }

  return next();
};

module.exports = {
  validadeToken,
  validadeTokenPut,
};