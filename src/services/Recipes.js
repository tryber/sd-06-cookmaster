const Recipes = require('../models/Recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await Recipes.createRecipe(name, ingredients, preparation, userId);

  return newRecipe;
};

const getAllRecipes = async () => Recipes.getAllRecipes();

const getRecipeById = async (id) => {
  const recipeNotFound = { statusCode: 404, customMessage: 'recipe not found' };
  const recipe = await Recipes.getRecipeById(id);

  if (!recipe) return recipeNotFound;

  return recipe;
};

const updateRecipe = async (recipe) => Recipes.updateRecipe(recipe);

const removeRecipe = async (id) => Recipes.removeRecipe(id);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
};