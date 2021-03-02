const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');

const { invalidEntry, recipeNotFound } = require('../utils/errorsLibrary');

const createRecipe = async (email, newRecipe) => {
  const { name, ingredients, preparation } = newRecipe;
  if (!name || !ingredients || !preparation) throw invalidEntry;

  const { _id: userId } = await usersModel.getByEmail(email);
  return recipesModel.createRecipe(newRecipe, userId);
};

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => {
  const recipeById = await recipesModel.getRecipeById(id);
  if (!recipeById) throw recipeNotFound;

  return recipeById;
};

const updateRecipe = async (id, recipe) => recipesModel.updateRecipe(id, recipe);

const deleteRecipe = (id) => recipesModel.deleteRecipe(id);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
