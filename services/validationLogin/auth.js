const validateToken = require('./validateToken');

const errorMsg = (status, mess) => ({ status, message: { message: mess } });
const auth = (req, _res, next) => {
  const UNAUTHORIZED = 401;
  const { authorization: token } = req.headers;
  if (!token) return next(errorMsg(UNAUTHORIZED, 'missing auth token'));
  const checkToken = validateToken(token);
  console.log('depois validation', checkToken);
  if (!checkToken) return next(errorMsg(UNAUTHORIZED, 'jwt malformed'));
  req.infoUser = checkToken;
  next();
};

module.exports = auth;