const RecipesModel = require('../model/RecipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => (
  RecipesModel.createRecipe(name, ingredients, preparation, userId)
);

const getAllRecipes = async () => (
  RecipesModel.getAllRecipes()
);

module.exports = {
  createRecipe,
  getAllRecipes,
};
