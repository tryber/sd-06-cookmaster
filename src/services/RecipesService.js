const { RecipesModel } = require('../models');

const registerNewRecipe = async (name, ingredients, preparation) => RecipesModel
  .registerNewRecipe(name, ingredients, preparation);

const listAllRecipes = async () => RecipesModel
  .listAllRecipes();

const listRecipeById = async (id) => RecipesModel
  .listRecipeById(id);

module.exports = {
  registerNewRecipe,
  listAllRecipes,
  listRecipeById,
};
