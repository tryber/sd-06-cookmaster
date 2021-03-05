const generateError = (status, code, message) => ({ status, code, message });

const status = require('./status');

const authorizationError = (message) => 
generateError(status.NOT_AUTHORIZED, 'Not_Authorized', message);

const validationError = (message) => 
generateError(status.BAD_REQUEST, 'Bad_request', message);

const notFoundError = (message) => 
generateError(status.NOT_FOUND, 'Not_found', message);

module.exports = {
  generateError, authorizationError, validationError, notFoundError,
};
