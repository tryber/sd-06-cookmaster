const model = require('../models/recipes');

const createNewRecipe = async (recipeName, ingredients, preparation, userId) => (
  model.createNewRecipe(recipeName, ingredients, preparation, userId)
);

const getAllRecipes = async () => model.getAllRecipes();

module.exports = {
  createNewRecipe,
  getAllRecipes,
};