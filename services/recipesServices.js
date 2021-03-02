const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const verifyToken = require('../data/verifyToken');

const {
  invalidEntry,
  invalidToken,
  recipeNotFound,
} = require('../utils/errorsLibrary');

const createRecipe = async (token, newRecipe) => {
  const { name, ingredients, preparation } = newRecipe;
  if (!name || !ingredients || !preparation) throw invalidEntry;

  const payload = verifyToken(token);
  if (payload.message === 'jwt malformed') throw invalidToken;

  const { data: { email, password } } = payload;
  const isUserValid = await usersModel.authenticateUser(email, password);

  if (!isUserValid) throw invalidToken;

  const { _id: userId } = isUserValid;
  return recipesModel.createRecipe(newRecipe, userId);
};

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => {
  const recipeById = await recipesModel.getRecipeById(id);
  console.log(recipeById);

  if (!recipeById) throw recipeNotFound;

  return recipeById;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
