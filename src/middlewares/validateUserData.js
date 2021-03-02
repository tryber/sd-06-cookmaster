const AppError = require('../errors/AppError');

const errorMsg = 'Invalid entries. Try again.';

function validateUserData(request, _response, next) {
  const { name, email, password } = request.body;

  if (!name || !password) throw new AppError(errorMsg);

  const emailRegex = /\w+@(\w+\.)+\w+$/i;
  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) throw new AppError(errorMsg);

  next();
}

module.exports = validateUserData;
