const { getAllRecipes, createRecipe, getById } = require('../models/recipesModel');

const getAllService = async () => {
  const recipes = await getAllRecipes();
  return recipes;
};

const createService = async (name, ingredients, preparation, userID) => {
  const newRecipe = await createRecipe(name, ingredients, preparation, userID);
  return newRecipe;
};

const getIdService = async (id) => {
  const recipeId = await getById(id);
  return recipeId;
};

module.exports = {
  getAllService,
  createService,
  getIdService,
};
