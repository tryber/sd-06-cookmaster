const model = require('../models/cookModelRecipes');

const recipeCreate = async (name, ingredients, preparation, userId) => {
  const newRecipe = await model.recipeCreate(name, ingredients, preparation, userId);
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await model.getAllRecipes();
  return recipes;
};

module.exports = {
  recipeCreate,
  getAllRecipes,
};
