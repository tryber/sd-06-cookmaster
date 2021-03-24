const rescue = require('express-rescue');
const { emailTypeValidation } = require('../utils/regexEmail');
const { BAD_REQUEST } = require('../utils/statusCodeHandler');

const validation = rescue(async (request, response, next) => {
  const { name, email, password } = request.body;
  const isRegexTrue = emailTypeValidation(email);

  if (!isRegexTrue) {
    return response.status(BAD_REQUEST.code).json(BAD_REQUEST.message);
  }

  if (!name || !email || !password) {
    return response.status(BAD_REQUEST.code).json(BAD_REQUEST.message);
  }

  next();
});

module.exports = validation;
