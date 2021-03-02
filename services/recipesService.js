const recipes = require('../models/recipes');

const dataValidate = async (name, ingredients, preparation) => {
  const errMessage = 'Invalid entries. Try again.';

  if (!name || !ingredients || !preparation) return { err: { status: 400, message: errMessage } };

  return false;
};

const create = async (name, ingredients, preparation) => {
  const errorMessage = await dataValidate(name, ingredients, preparation);

  if (errorMessage) return errorMessage;

  const recipeCreated = await recipes.create(name, ingredients, preparation);

  return recipeCreated;
};

module.exports = {
  create,
};
