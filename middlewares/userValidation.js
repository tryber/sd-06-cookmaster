const rescue = require('express-rescue');
const { emailTypeValidation } = require('../utils/regexEmail');
const { BAD_REQUEST } = require('../utils/statusCodeHandler');

const message = 'Invalid entries. Try again.';

const validation = rescue(async (request, response, next) => {
  const { name, email, password } = request.body;
  const isRegexTrue = emailTypeValidation(email);

  if (!isRegexTrue) return response.status(BAD_REQUEST.code).json({ message });

  if (name === undefined) {
    return response.status(BAD_REQUEST.code).json({ message });
  }
  if (email === undefined) {
    return response.status(BAD_REQUEST.code).json({ message });
  }
  if (password === undefined) {
    return response.status(BAD_REQUEST.code).json({ message });
  }

  next();
});

module.exports = validation;
