const RecipeModel = require('../models/recipe');

const addRec = async (name, ingredients, preparation, userId) => {
  const result = await RecipeModel.addRecipe(name, ingredients, preparation, userId);
  return result;
};

const getRecipes = async () => {
  const recipes = await RecipeModel.getAllRecipes();
  return recipes;
};

module.exports = {
  addRec,
  getRecipes,
};
