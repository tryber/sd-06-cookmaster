const validateToken = require('../auth/validateToken');

const UNAUTHORIZED = 401;
const errorMessage = 'jwt malformed';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  const verify = validateToken(token);

  if (!verify) return res.status(UNAUTHORIZED).send({ message: errorMessage });

  next();
};
