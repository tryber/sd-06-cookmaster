const Boom = require('@hapi/boom');
const { validateEmail } = require('../utils');

module.exports = (req, _res, next) => {
  const { name, email, password } = req.body;

  const isValidEmail = validateEmail(email);

  if (!name || !email || !password || !isValidEmail) {
    return next(Boom.badRequest('Invalid entries. Try again.'));
  }

  next();
};
