const jwt = require('jsonwebtoken');

const message401 = 'jwt malformed';

const createError = (message, status) => ({ message, status });

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'segredo', (error, decoded) => {
    if (error) {
      return next(createError(message401, 401));
    }
    const { _id, role } = decoded;
    res.locals.userId = _id;
    res.locals.role = role;
    next();
  });
};

module.exports = {
  tokenValidation,
  createError,

};
