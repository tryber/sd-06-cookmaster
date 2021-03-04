const { utils } = require('../models');
const { validateRecipe } = require('../utils/validators');
const { dictionary: { error } } = require('../utils/dictionary');

const createRecipe = async (recipe, userId) => {
  validateRecipe(recipe);
  return utils.insertToDb('recipes', { ...recipe, userId });
};

const getRecipes = async (id) => {
  const recipesList = await utils.queryFromDb('recipes', id);
  if (!recipesList) throw new Error(error.recipeNotFound);
  return recipesList;
};

const editRecipe = async (recipeId, userId, data) => {
  const user = await utils.queryFromDb('users', userId);
  const recipe = await utils.queryFromDb('recipes', recipeId);
  if (userId !== recipe.userId && user.role !== 'admin') throw new Error(error.notAuthorized);
  const updatedRecipe = { ...recipe, ...data };
  return utils.updateDb('recipes', recipeId, updatedRecipe);
};

const deleteRecipe = async (recipeId, userId) => {
  const user = await utils.queryFromDb('users', userId);
  const recipe = await utils.queryFromDb('recipes', recipeId);
  if (userId !== recipe.userId && user.role !== 'admin') throw new Error(error.notAuthorized);
  return utils.deleteFromDb('recipes', recipeId);
};

module.exports = {
  createRecipe,
  getRecipes,
  editRecipe,
  deleteRecipe,
};
