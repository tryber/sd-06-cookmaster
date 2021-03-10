const Err = require('../errors/Err');

const handleError = (err, _req, res, _next) => {
  if (err instanceof Err) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = handleError;
