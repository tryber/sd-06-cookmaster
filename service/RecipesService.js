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

const editRecipe = async (id, name, ingredients, preparation) => (
  RecipesModel.editRecipe(id, name, ingredients, preparation)
);

const deleteRecipe = async (id) => (
  RecipesModel.deleteRecipe(id)
);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
