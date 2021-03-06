const recipes = require('../models/recipes');

const createRecipe = async (recipeInfo, userId) => {
  const newUser = await recipes.createRecipe(recipeInfo, userId);
  return newUser;
};

const getAll = async () => recipes.getAll();

const editRecipeById = async (id, recipeInfo, userId) => {
  const editedRecipe = await recipes.editRecipeById(id, recipeInfo, userId);
  return editedRecipe;
};

const deleteRecipe = async (id) => recipes.deleteRecipe(id);

module.exports = {
  createRecipe,
  getAll,
  editRecipeById,
  deleteRecipe,
};
