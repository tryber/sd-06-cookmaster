const rescue = require('express-rescue');

const { emailTypeValidation } = require('../utils/regexEmail');
const { BAD_REQUEST } = require('../utils/statusCodeHandler');

const validateUser = rescue(async (request, response, next) => {
  const { name, email, password } = request.body;
  const isRegexTrue = emailTypeValidation(email);

  if (!name || !email || !password) {
    return response.status(BAD_REQUEST.code).json({ message: BAD_REQUEST.message });
  }

  if (!isRegexTrue) {
    return response.status(BAD_REQUEST.code).json({ message: BAD_REQUEST.message });
  }

  next();
});

module.exports = { validateUser };
