const { RecipesModel } = require('../models');

const registerNewRecipe = async (name, ingredients, preparation) => RecipesModel
  .registerNewRecipe(name, ingredients, preparation);

const listAllRecipes = async () => RecipesModel
  .listAllRecipes();

module.exports = {
  registerNewRecipe,
  listAllRecipes,
};
