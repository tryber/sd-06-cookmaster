module.exports = (err, _req, res, _next) => {
  // console.log('middel de erro', { err }); para o rescue do controller
  const status500 = 500;
  res.status(err.status || status500).json(err.message);
};
