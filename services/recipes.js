const { ObjectId } = require('bson');
const model = require('../models/recipes');

const createNewRecipe = async (recipeName, ingredients, preparation, userId) => (
  model.createNewRecipe(recipeName, ingredients, preparation, userId)
);

const getAllRecipes = async () => model.getAllRecipes();

const getRecipeById = async (recipeId) => {
  if (!ObjectId.isValid(recipeId)) return undefined;
  
  return model.getRecipeById(recipeId);
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
};