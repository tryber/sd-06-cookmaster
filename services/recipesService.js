const { getAllRecipes, createRecipe } = require('../models/recipesModel');

const getAllService = async () => {
  const recipes = await getAllRecipes();
  return recipes;
};

const createService = async (name, ingredients, preparation, userID) => {
  const newRecipe = await createRecipe(name, ingredients, preparation, userID);
  return newRecipe;
};

module.exports = {
  getAllService,
  createService,
};
