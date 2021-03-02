const AppError = require('../errors/AppError');
const { UNAUTHORIZED } = require('../errors/status');

const errorMsg = 'All fields must be filled';
const emailError = 'Incorrect username or password';

function validateUserData(request, _response, next) {
  const { email, password } = request.body;

  if (!password || !email) throw new AppError(errorMsg, UNAUTHORIZED);

  const emailRegex = /\w+@(\w+\.)+\w+$/i;
  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) throw new AppError(emailError, UNAUTHORIZED);

  next();
}

module.exports = validateUserData;
