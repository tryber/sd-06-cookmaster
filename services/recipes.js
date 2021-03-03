const { ObjectId } = require('mongodb');
const recipesModels = require('../models');
const ThrowError = require('../middlewares/handleConfigError');

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new ThrowError('recipe not found', 'invalid_id');
  }
  const recipe = await recipesModels.recipes.getRecipeById(id);
  if (!recipe) {
    throw new ThrowError('recipe not found', 'invalid_id');
  }
  return recipe;
};

module.exports = {
  getRecipeById,
};
