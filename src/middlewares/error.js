const Boom = require('@hapi/boom');

module.exports = (err, _req, res, _next) => {
  if (Boom.isBoom(err)) {
    const { statusCode, payload } = err.output;
   
    return res
      .status(statusCode)
      .json({ message: payload.message });
  }
};
