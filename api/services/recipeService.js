const Model = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) throw Error('Invalid entries. Try again.');

  const recipe = await Model.createRecipe(name, ingredients, preparation);
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await Model.getAllRecipes();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
