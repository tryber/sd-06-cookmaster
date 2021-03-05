const recipes = require('../models/recipes');

const createRecipe = async (recipeInfo, userId) => {
    const newUser = await recipes.createRecipe(recipeInfo, userId);
  return newUser;
};

module.exports = {
  createRecipe,
};