const { RecipesModel } = require('../models');

const registerNewRecipe = async (name, ingredients, preparation) => RecipesModel
  .registerNewRecipe(name, ingredients, preparation);

const listAllRecipes = async () => RecipesModel
  .listAllRecipes();

const listRecipeById = async (id) => RecipesModel
  .listRecipeById(id);

const editRecipe = async (id, name, ingredients, preparation) => RecipesModel
  .editRecipe(id, name, ingredients, preparation);

module.exports = {
  registerNewRecipe,
  listAllRecipes,
  listRecipeById,
  editRecipe,
};
