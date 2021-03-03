const { utils } = require('../models');
const { validateRecipe } = require('../utils/validators');

const createRecipe = async (recipe, userId) => {
  validateRecipe(recipe);
  return utils.insertToDb('recipes', { ...recipe, userId });
};

module.exports = {
  createRecipe,
};
