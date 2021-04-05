const { recipeValidate } = require('../middlewares/recipeValidate');
const { updateRecipeById } = require('../models/Recipes');

const updateRecipeService = async (id, name, ingredients, preparation) => {
  const errorMessage = await recipeValidate(name, ingredients, preparation);

  if (errorMessage) return errorMessage;

  const editRecipe = await updateRecipeById(id, name, ingredients, preparation);

  return editRecipe;
};

module.exports = {
  updateRecipeService,
};