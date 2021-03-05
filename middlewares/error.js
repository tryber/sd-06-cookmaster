module.exports = (err, req, res, _next) => {
  console.log(err);
  res.status(500).json({
    message: 'Something is wrong..',
    details: err.message,
    endpoint: `${req.method} ${req.path}`,
  });
};