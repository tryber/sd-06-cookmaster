const returnedStatusAndMessage = require('../util/validations');

const status400 = 400;
const status404 = 404;
const TWENTYFOUR = 24;

const validateRecipe = (request, response, next) => {
  const { name, ingredients, preparation } = request.body;

  if (!name || !ingredients || !preparation) {
    return returnedStatusAndMessage(response,
    status400,
    'Invalid entries. Try again.');
  }

  next();
};

const idIsValid = (request, response, next) => {
  const { id } = request.params;
  return (id.length !== TWENTYFOUR)
    ? returnedStatusAndMessage(response, status404, 'recipe not found')
    : next();
};

module.exports = {
  validateRecipe,
  idIsValid,
};
