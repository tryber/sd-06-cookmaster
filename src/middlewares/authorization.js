const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
require('dotenv').config();

const { IS_LOCAL, TOKEN_SECRET } = process.env;
const secret = (IS_LOCAL)
? TOKEN_SECRET
: 'mySecretToken';

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(Boom.unauthorized('missing auth token'));
  
  try {
    jwt.verify(token, secret, (err, email) => {
      if (err) return next(Boom.unauthorized('jwt malformed'));

      req.email = email;
      next();
    });
  } catch (err) {
    next(err);
  }
};
