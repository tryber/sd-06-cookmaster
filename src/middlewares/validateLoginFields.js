const Boom = require('@hapi/boom');
const rescue = require('express-rescue');
const { validateEmail, validatePassword } = require('../utils');

module.exports = rescue(async (req, _res, next) => {
  const { email, password } = req.body;

  const isValidPassword = await validatePassword(password);
  const isValidEmail = validateEmail(email);

  if (!email || !password) {
    return next(Boom.unauthorized('All fields must be filled'));
  }

  if (!isValidEmail || !isValidPassword) {
    return next(Boom.unauthorized('Incorrect username or password'));
  }

  next();
});
