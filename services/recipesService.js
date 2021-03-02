const model = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await model.createRecipe(name, ingredients, preparation, userId);
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await model.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await model.getRecipeById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};