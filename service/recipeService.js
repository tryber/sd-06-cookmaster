const Recipes = require('../model/recipesMoldels');

const createRecipes = async (recipe) => {
  const create = await Recipes.createRecipes(recipe);
  return create;
};
const listRecipes = async () => {
  const list = await Recipes.listRecipes();
  return list;
};
const findById = async (id) => {
  try {
    const byId = await Recipes.findById(id);
    return byId;
  } catch (_e) {
    return null;
  }
};

module.exports = {
  createRecipes,
  listRecipes,
  findById,
};