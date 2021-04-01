const { createRecipe, getRecipeById, updateRecipeById } = require('../model/recipesModel');

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

const editRecipeById = async (id, recipe, user) => {
  const updateRecipe = await updateRecipeById(id, recipe);
  const recipeFromDB = await getRecipeById(id);

  if (recipeFromDB.userId !== user.id && user.role !== 'admin') return null;

  return updateRecipe;
};

module.exports = {
  validateCreateRecipe,
  recipeDetailsById,
  editRecipeById,
};