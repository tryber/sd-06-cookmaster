const { status, errorMessages } = require('../middlewares/errorHandler/dictionaries');
const recipesServices = require('../services/recipesServices');

const registerRecipe = async (req, res) => {
  const responsePayload = recipesServices.registerRecipe();
  console.log(responsePayload);
  res.status(status.ok).send('Register Recipes');
};

const getAllRecipes = async (req, res) => {
  const responsePayload = recipesServices.getAllRecipes();
  console.log(responsePayload);
  res.status(status.ok).send('Get all Recipes');
};

const getRecipesById = async (req, res) => {
  const responsePayload = recipesServices.getRecipesById();
  console.log(responsePayload);
  res.status(status.ok).send('Get recipes by id');
};

const deleteRecipeById = async (req, res) => {
  const responsePayload = recipesServices.deleteRecipeById();
  console.log(responsePayload);
  res.status(status.ok).send('Delete recipes by id');
};

const addImageToRecipe = async (req, res) => {
  const responsePayload = recipesServices.addImageToRecipe();
  console.log(responsePayload);
  res.status(status.ok).send('Add image to Recipe');
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipesById,
  deleteRecipeById,
  addImageToRecipe,
};