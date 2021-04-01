const { createRecipe, getRecipeById } = require('../model/recipesModel');

const validateCreateRecipe = async (recipe, id) => {
  const { name, ingredients, preparation } = recipe;

  const recipeCreated = await createRecipe(name, ingredients, preparation, id);

  return recipeCreated;
};

const recipeDetailsById = async (id) => {
  const getRecipe = await getRecipeById(id);

  if (!getRecipe) return null;

  return getRecipe;
};

module.exports = {
  validateCreateRecipe,
  recipeDetailsById,
};