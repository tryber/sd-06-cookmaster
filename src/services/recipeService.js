const recipeModel = require('../models/recipeModel');

const createRecipe = async (recipe) => {
  const createdRecipe = recipeModel.createRecipe(recipe);

  return createdRecipe;
};

const verifyFields = async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;

  if (!name || !ingredients || !preparation) {
    return response.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const getAllRecipes = async () => {
  const allRecipes = await recipeModel.getAllRecipes();

  return allRecipes;
};

module.exports = {
  createRecipe,
  verifyFields,
  getAllRecipes,
};
