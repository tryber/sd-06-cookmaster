const rescue = require('express-rescue');
const { UNAUTHORIZED } = require('../utils/statusCodeHandler');

const loginValidation = rescue(async (request, response, next) => {
  const { email, password } = request.body;
  const { requiredField } = UNAUTHORIZED.message;

  if (email === undefined || password === undefined) {
    return response.status(UNAUTHORIZED.code).json({ message: requiredField });
  }

  next();
});

module.exports = { loginValidation };
