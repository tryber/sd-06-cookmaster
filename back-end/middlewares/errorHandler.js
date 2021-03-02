const { sendError } = require('./errorHandler/errorHandler');

const errorHandler = (error, _req, res, _next) => {
  console.log('cheguei aqui');
  sendError(error, res);
};

module.exports = errorHandler;