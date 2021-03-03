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

const updateRecipe = async ({ id, user, body }) => {
  const { email } = user;
  await recipesModels.updateRecipe(id, body);
  const { _id: userId } = await usersModels.findUserByEmail(email);

  const { name, ingredients, preparation } = body;
  const responsePayload = {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };

  return responsePayload;
};

const deleteRecipeById = async (id) => {
  const responsePayload = await recipesModels.deleteRecipeById(id);
  return responsePayload;
};

const addImageToRecipe = async (_req, _res) => {
  const responsePayload = await recipesModels.addImageToRecipe();
  return responsePayload; 
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipesById,
  deleteRecipeById,
  addImageToRecipe,
  updateRecipe,
};