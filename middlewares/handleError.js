const Err = require('../errors/Err');

const handleError = (err, _req, res, _next) => {
  if (err instanceof Err) {
    return res.status(err.status).json({
      err: {
        message: err.message,
        code: err.code,
      },
    });
  }
  console.log(err);
  return res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = handleError;
