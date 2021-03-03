const Recipes = require('../model/recipesMoldels');

const createRecipes = async (recipe) => {
  const create = await Recipes.createRecipes(recipe);
  return create;
};
const listRecipes = async () => {
  const list = await Recipes.listRecipes();
  return list;
};

module.exports = {
  createRecipes,
  listRecipes,
};