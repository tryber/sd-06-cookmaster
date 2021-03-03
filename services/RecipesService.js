const RecipesModel = require('../models/RecipesModel');

const getAllRecipesService = async () => {
  const allRecipes = await RecipesModel.getAllRecipes();
  return allRecipes;
};

const createRecipeService = async (name, ingredients, preparation, userId) => {
  const { _id } = await RecipesModel.createRecipe(name, ingredients, preparation, userId);
  return ({
    name,
    ingredients,
    preparation,
    userId,
    _id,
  });
};

const getByIdService = async (id) => {
  const recipe = await RecipesModel.getById(id);
  return recipe;
};

const editRecipeService = async (id, name, ingredients, preparation) => {
    await RecipesModel.editById(id, name, ingredients, preparation);
  return { name, ingredients, preparation };
};

const deleteRecipeService = async (id) => {
  await RecipesModel.deleteRecipe(id);
};

const addImageService = async (id, pathImage) => {
  await RecipesModel.addImage(id, pathImage);
};

module.exports = {
  getAllRecipesService,
  createRecipeService,
  getByIdService,
  editRecipeService,
  deleteRecipeService,
  addImageService,
};
