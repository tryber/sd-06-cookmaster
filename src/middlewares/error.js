const Boom = require('@hapi/boom');

const badImplementation = 500;

module.exports = (err, _req, res, _next) => {
  if (Boom.isBoom(err)) {
    const { statusCode, payload } = err.output;
   
    return res
      .status(statusCode)
      .json({ message: payload.message });
  }

  return res
    .status(badImplementation)
    .json({ message: err.message });
};
