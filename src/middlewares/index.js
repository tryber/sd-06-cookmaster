const UNHANDLED_ERROR = 'Internal Error';
const UNHANDLED_ERROR_STATUS = 500;

const handleError = (err, _req, res, _next) => {
  const { payload, status } = err;
  console.log(err);
  if (!payload) {
    return res.status(UNHANDLED_ERROR_STATUS)
       .json({ error: UNHANDLED_ERROR });
  }
  return res.status(status).json(payload);
};

const tokenValidation = (_err, _req, _res, _next) => {
  const retorno = 'A fazer';
  return retorno;
};

module.exports = {
  handleError,
  tokenValidation,
};
