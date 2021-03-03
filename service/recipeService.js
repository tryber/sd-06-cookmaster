const Recipes = require('../model/recipesMoldels');

const createRecipes = async (recipe) => {
  const create = await Recipes.createRecipes(recipe);
  return create;
};

module.exports = {
  createRecipes,
};