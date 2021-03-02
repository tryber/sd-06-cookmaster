const Boom = require('@hapi/boom');
const { validateEmail } = require('../utils');

module.exports = (req, _res, next) => {
  const { email, password } = req.body;
  
  const isValidEmail = validateEmail(email);

  if (!email || !password) {
    return next(Boom.unauthorized('All fields must be filled'));
  }

  if (!isValidEmail) {
    return next(Boom.unauthorized('Incorrect username or password'));
  }

  next();
};
