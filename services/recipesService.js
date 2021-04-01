const recipesModel = require('../model/recipesModel');

const registerRecipes = async (name, ingredients, preparation, authorization) => {
  // const role = payload.role;
  const newRecipes = await recipesModel.createRecipes(
    name, ingredients, preparation, authorization,
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