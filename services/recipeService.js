const { ObjectId } = require('bson');
const model = require('../models/recipeModels');

const createNewRecipe = async (recipeName, ingredients, preparation, userId) => (
  model.createNewRecipe(recipeName, ingredients, preparation, userId)
);

const getAllRecipes = async () => model.getAllRecipes();

const getRecipeById = async (recipeId) => {
  if (!ObjectId.isValid(recipeId)) return undefined;
  
  return model.getRecipeById(recipeId);
};

const editRecipe = async (recipeId, name, ingredients, preparation) => {
  if (!ObjectId.isValid(recipeId)) return undefined;

  return model.editRecipe(recipeId, name, ingredients, preparation);
};

const deleteRecipe = async (recipeId) => model.deleteRecipe(recipeId);

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};