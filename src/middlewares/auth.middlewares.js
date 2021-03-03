const { dictionary: { error } } = require('../utils/dictionary');
const { verifyToken } = require('../security');

module.exports = (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) throw new Error(error.noAuthToken);
    const { sub } = verifyToken(token);
    req.user = sub;
    return next();
  } catch (err) {
    next(err);
  }
};