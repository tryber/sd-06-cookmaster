const jwt = require('jsonwebtoken');

const secret = 'secretToken';

const auth = (req, res, next) => {
  const UNAUTHORIZED = 401;
  const { token } = req.header.authorization;

  const checkToken = jwt.verify(token, secret);
  if (!checkToken) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
  next();
};

module.exports = auth;