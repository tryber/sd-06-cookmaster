const recipesModels = require('../models/recipesModels');
const usersModels = require('../models/usersModels');

const registerRecipe = async (requestPayload) => {
  const { body, user } = requestPayload;
  const { email } = user;
  const { insertedId } = await recipesModels.registerRecipe(body);
  const { _id: userId } = await usersModels.findUserByEmail(email);
  
  const responsePayload = {
    recipe: {
      ...body,
      userId,
      _id: insertedId,
    },
  };

  return responsePayload;
};

const getAllRecipes = async () => {
  const responsePayload = await recipesModels.getAllRecipes();
  return responsePayload;
};

const getRecipesById = async (id) => {
  const responsePayload = await recipesModels.getRecipesById(id);
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