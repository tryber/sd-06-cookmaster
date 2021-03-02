const Boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { name, email, password } = req.body;

  const testEmail = /^[\w-.]+@([a-z-]+\.)+[\w-]{2,4}$/;
  const validEmail = testEmail.test(email);

  if (!name || !email || !password || !validEmail) {
    return next(Boom.badRequest('Invalid entries. Try again.'));
  }

  next();
};
