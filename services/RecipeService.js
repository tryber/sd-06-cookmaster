const returnedStatusAndMessage = require('../util/validations');

const status400 = 400;

const validateRecipe = (request, response, next) => {
  const { name, ingredients, preparation } = request.body;

  if (!name || !ingredients || !preparation) {
    return returnedStatusAndMessage(response,
    status400,
    'Invalid entries. Try again.');
  }

  next();
};

module.exports = {
  validateRecipe,
};
