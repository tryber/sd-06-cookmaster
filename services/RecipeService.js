const returnedStatusAndMessage = require('../util/validations');
const recipes = require('../models/recipes');

const status400 = 400;
const status404 = 404;
const status401 = 401;
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

const userRole = async (request, response, next) => {
  const { user: { role, _id: userId }, params: { id } } = request;
  
  const recipe = await recipes.findById(id);
  if (role === 'admin' || (userId === recipe.userId)) return next();
  
  return returnedStatusAndMessage(response, status401, 'missing auth token');
};

module.exports = {
  validateRecipe,
  idIsValid,
  userRole,
};
