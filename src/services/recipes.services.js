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

module.exports = {
  createRecipe,
  getRecipes,
};
