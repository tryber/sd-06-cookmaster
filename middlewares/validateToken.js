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

module.exports = {
  validadeToken,
};