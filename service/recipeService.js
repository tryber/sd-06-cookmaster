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
const updateRecipes = async (id, recipe) => {
  const upload = await Recipes.updateRecipe(id, recipe);
  return upload;
};
const removeRecipe = async (id) => {
  const remove = await Recipes.removeRecipe(id);
  return remove;
};
const addImageRecipe = async (id, image) => {
  const add = await Recipes.addImageRecipe(id, image);
  return add;
};

module.exports = {
  createRecipes,
  listRecipes,
  findById,
  updateRecipes,
  removeRecipe,
  addImageRecipe,
};