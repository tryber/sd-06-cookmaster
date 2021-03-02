const {
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
} = require('../utils/statusCode');

module.exports = (err, _req, res, _next) => {
  const { code, message } = err;

  if (code === 'invalid_data') res.status(BAD_REQUEST).json({ message });
  if (code === 'data_conflict') res.status(CONFLICT).json({ message });
  if (code === 'invalid_credentials') res.status(UNAUTHORIZED).json({ message });
};
