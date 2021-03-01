const recipesModels = require('../models/recipesModels');

const registerRecipe = async (req, res) => {
  const responsePayload = await recipesModels.registerRecipes();
  return responsePayload;
};

const getAllRecipes = async (req, res) => {
  const responsePayload = await recipesModels.getAllRecipes();
  return responsePayload;
};

const getRecipesById = async (req, res) => {
  const responsePayload = await recipesModels.getRecipesById();
  return responsePayload;
};

const deleteRecipeById = async (req, res) => {
  const responsePayload = await recipesModels.deleteRecipeById();
  return responsePayload;
};

const addImageToRecipe = async (req, res) => {
  const responsePayload = await recipesModels.addImageToRecipe();
  return responsePayload; 
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipesById,
  deleteRecipeById,
  addImageToRecipe,
};