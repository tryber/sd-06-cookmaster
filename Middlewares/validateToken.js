const verifyToken = require('../auth/verifyToken');

const UNAUTHORIZED = 401;
const errorMessage = 'jwt malformed';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  const verify = verifyToken(token);

  if (!verify) return res.status(UNAUTHORIZED).send({ message: errorMessage });

  next();
};
