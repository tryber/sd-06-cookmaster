const Boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return next(Boom.badRequest('Invalid entries. Try again.'));
  }

  next();
};
