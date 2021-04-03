const { createRecipe } = require('../models/Recipes');
const { recipeValidate } = require('../middlewares/recipeValidate');

const createRecipeService = async ({ name, ingredients, preparation, userId }) => {
  const errorMessage = await recipeValidate(name, ingredients, preparation);

  if (errorMessage) return errorMessage;

  const recipeCreated = await createRecipe(name, ingredients, preparation, userId);

  return recipeCreated;
};

module.exports = {
  createRecipeService,
};