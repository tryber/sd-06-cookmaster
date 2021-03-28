const { ObjectId } = require('bson');
const model = require('../models/recipes');

const createNewRecipe = async (recipeName, ingredients, preparation, userId) => (
  model.createNewRecipe(recipeName, ingredients, preparation, userId)
);

const getAllRecipes = async () => model.getAllRecipes();

const getRecipeById = async (recipeId) => model.getRecipeById(recipeId);

const editRecipe = async (recipeId, name, ingredients, preparation) => {
  if (!ObjectId.isValid(recipeId)) return undefined;

  return model.editRecipe(recipeId, name, ingredients, preparation);
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
};