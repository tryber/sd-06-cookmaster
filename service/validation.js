const user = require('../models/user');

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

const createError = (message, status) => ({ message, status });

const userVerification = async (req, _res, next) => {
  const { name, email, password } = req.body;
  const verifyEmail = await user.findByEmail(email);
  if (!name || !email || !password || !emailRegex.test(email)) {
    next(createError('Invalid entries. Try again.', 400));
  }
  if (verifyEmail) {
    next(createError('Email already registered', 409));
  }
  next();
};

// ao passar paramentros para o next, estou colocando esse valor no parametro error do middleware de erro

module.exports = { userVerification };
