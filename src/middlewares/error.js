const error = (err, _req, res, _next) => {
  console.log({ err });

  res.status(err.statusCode).json({ message: err.customMessage });
};

module.exports = error;