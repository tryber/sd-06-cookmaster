const { RecipesModel } = require('../models');

const registerNewRecipe = async (name, ingredients, preparation) => RecipesModel
  .registerNewRecipe(name, ingredients, preparation);

module.exports = {
  registerNewRecipe,
};
