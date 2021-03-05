const recipes = require('../models/recipes');

const createRecipe = async (recipeInfo, userId) => {
    const newUser = await recipes.createRecipe(recipeInfo, userId);
  return newUser;
};

const getAll = async () => recipes.getAll();

module.exports = {
  createRecipe,
  getAll,
};