const RecipesModel = require('../model/RecipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => (
  RecipesModel.createRecipe(name, ingredients, preparation, userId)
);

const getAllRecipes = async () => (
  RecipesModel.getAllRecipes()
);

const getRecipeById = async (id) => (
  RecipesModel.getRecipeById(id)
);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
