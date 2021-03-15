const handleError = require('./handleError.middleware');
const auth = require('./auth.middlewares');

module.exports = {
  handleError,
  auth,
};
