const { emailFind, userCreate, recipeCreate, getRecipes,
  getRecipe, recipeEdit, deleteRecipe } = require('../models/userModels');

const findEmail = async (email) => {
  const emailValid = await emailFind(email);
  return emailValid;
};

const createUser = async (user) => {
  const newUser = await userCreate(user);
  return newUser;
};

const createRecipe = async (recipe) => {
  const newRecipe = await recipeCreate(recipe);
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await getRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await getRecipe(id);
  return recipe;
};

const editRecipe = async (recipe) => {
  const newRecipe = await recipeEdit(recipe);
  return newRecipe;
};

const recipeDelete = async (id) => {
  const rmv = deleteRecipe(id);
  return rmv;
};

module.exports = {
  findEmail,
  createUser,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  recipeDelete,
};
