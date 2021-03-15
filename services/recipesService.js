const model = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await model.createRecipe(name, ingredients, preparation, userId);
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await model.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await model.getRecipeById(id);
  return recipe;
};

const editRecipeById = async (id, payload, userId) => {
  const editedRecipe = await model.editRecipeById(id, payload, userId);
  return editedRecipe;
};

const removeRecipeById = async (id) => {
  await model.removeRecipeById(id);
};

const uploadImage = async (id) => {
  const recipe = await getRecipeById(id);

  const recipeWithImage = await model.uploadImage(id, recipe);

  return recipeWithImage;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  removeRecipeById,
  uploadImage,
};