const verifyToken = require('../auth/verifyToken');

const UNAUTHORIZED = 401;
const errorMessage = 'jwt malformed';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next();

  const verify = verifyToken(token);

  if (!verify) return res.status(UNAUTHORIZED).send({ message: errorMessage });

  next();
};
