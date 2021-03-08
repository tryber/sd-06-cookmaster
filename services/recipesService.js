const recipesModel = require('../model/recipesModel');
const validateToken = require('./auth/validateToken');

const registerRecipes = async (name, ingredients, preparation, authorization) => {
  const payload = await validateToken(authorization);
  const userId = payload._id;
  // const role = payload.role;
  const newRecipes = await recipesModel.createRecipes(
    name, ingredients, preparation, userId,
    );
  
  return newRecipes;
};

const getAllRecipes = () => recipesModel.getAll();

const getRecipesId = async (id) => {
  const returnRecipeId = await recipesModel.getId(id);
  return returnRecipeId;
};

const putEditListId = async (id, name, ingredients, preparation) => {
  const returnPutEditId = await recipesModel.putId(id, name, ingredients, preparation);
  return returnPutEditId;
};

const deleteOneRecipes = async (id) => {
  const deletedRecipes = await recipesModel.deleteRecipes(id);
  return deletedRecipes;
};
module.exports = {
  registerRecipes,
  getAllRecipes,
  getRecipesId,
  putEditListId,
  deleteOneRecipes,
};