const rescue = require('express-rescue');
const { emailTypeValidation } = require('../utils/regexEmail');
const { BAD_REQUEST } = require('../utils/statusCodeHandler');

const validateUser = rescue(async (request, response, next) => {
  const { name, email, password } = request.body;

  const invalidEmail = email === undefined;
  const invalidName = name === undefined;
  const invalidPassword = password === undefined;

  if (invalidName || invalidEmail || invalidPassword) {
    return response.status(BAD_REQUEST.code).json({ message: BAD_REQUEST.message });
  }

  const isRegexTrue = emailTypeValidation(email);

  if (!isRegexTrue) {
    return response.status(BAD_REQUEST.code).json({ message: BAD_REQUEST.message });
  }

  next();
});

module.exports = { validateUser };
