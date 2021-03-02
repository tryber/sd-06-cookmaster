const Boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(Boom.unauthorized('All fields must be filled'));
  }

  const testEmail = /^[\w-.]+@([a-z-]+\.)+[\w-]{2,4}$/;
  
  const validEmail = testEmail.test(email);

  if (!validEmail) {
    return next(Boom.unauthorized('Incorrect username or password'));
  }

  next();
};
