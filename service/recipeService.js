const { createRecipe, getRecipeById, updateRecipeById } = require('../model/recipesModel');
const { getUserById } = require('../model/userModel');

const validateCreateRecipe = async (recipe, id) => {
  const { name, ingredients, preparation } = recipe;

  const recipeCreated = await createRecipe(name, ingredients, preparation, id);

  return recipeCreated;
};

const recipeDetailsById = async (id) => {
  const getRecipe = await getRecipeById(id);

  if (!getRecipe) return null;

  return getRecipe;
};

const editRecipeById = async (id, userId, recipe) => {
  const getRecipe = await getRecipeById(id);
  const getUser = await getUserById(userId);
  const { role } = getUser;
  console.log(role);

  if (getRecipe.userId !== userId && role !== 'admin') return null;

  const updateRecipe = await updateRecipeById(id, recipe);
  return updateRecipe;
};

module.exports = {
  validateCreateRecipe,
  recipeDetailsById,
  editRecipeById,
};