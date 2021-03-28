const user = require('../../models/user');

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
const messageError400 = 'Invalid entries. Try again.';
const messageError409 = 'Email already registered';

const createError = (message, status) => ({ message, status });

const nameVerification = (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    next(createError('Invalid entries. Try again.', 400));
  }
  next();
};
const emailVerification = async (req, _res, next) => {
  const { email } = req.body;
  const verifyEmail = await user.findByEmail(email);
  if (!email || !emailRegex.test(email)) {
    next(createError(messageError400, 400));
  }
  if (verifyEmail) {
    next(createError(messageError409, 409));
  }
  next();
};

const passwordVerification = (req, _res, next) => {
  const { password } = req.body;
  if (!password) {
    next(createError(messageError400, 400));
  }
  next();
};

// ao passar paramentros para o next, estou colocando esse valor no parametro error do middleware de erro

module.exports = {
  nameVerification,
  emailVerification,
  passwordVerification,
};
