const Recipes = require('../models/Recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await Recipes.createRecipe(name, ingredients, preparation, userId);

  return newRecipe;
};

const getAllRecipes = async () => Recipes.getAllRecipes();

module.exports = {
  createRecipe,
  getAllRecipes,
};