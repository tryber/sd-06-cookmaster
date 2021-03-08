const tokenValidation = require('../utils/tokenValidation');
const status = require('../utils/allStatusCode');

const VerifyAuthotization = (req, res, next) => {
  const { authorization } = req.headers;
  const payload = tokenValidation(authorization);

  if (!payload) return res.status(status.UNAUTHORIZED).json({ message: 'jwt malformed' }); 

  next();
};

module.exports = VerifyAuthotization;