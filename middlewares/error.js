module.exports = (err, _req, res, _next) => {
  const status500 = 500;
  res.status(err.status || status500).json(err.message);
};
