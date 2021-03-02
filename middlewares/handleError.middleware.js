const handleErrorMessage = require('../utils/dictionary/handleErrorMessage');

const badRequest = 400;

module.exports = (err, _req, res, _next) => {
  let error = (typeof err === 'string') ? err : err.message;
  if (error[0] !== '{') error = handleErrorMessage(error, badRequest, 'unexpected_error');
  const { message, status, code } = JSON.parse(error);

  res.status(status).json({
    err: { code, message },
  });
};
