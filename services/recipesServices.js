const Recipes = require('../model/recipesModel');

const getAllRecipes = async () => {
  const foundAll = await Recipes.getAllRecipes();

  return foundAll;
};

const findProductsById = async (id) => {
  const foundId = await Recipes.findRecipesById(id);
  
  return foundId;
};

const createRecipes = async (name, ingredients, preparation, userId) => {
  const newRecipe = await Recipes.createRecipes(name, ingredients, preparation, userId);

  return newRecipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const recipeUpdate = await Recipes.updateRecipes(id, name, ingredients, preparation);
  
  return recipeUpdate;
};

const deleteRecipes = async (id) => {
  await Recipes.deleteRecipes(id);
};

const updateImages = async (id, image) => {
  const recipeImage = await Recipes.updateImages(id, image);
  
  return recipeImage;
};

module.exports = {
  getAllRecipes,
  findProductsById,
  createRecipes,
  updateRecipe,
  deleteRecipes,
  updateImages,
};
