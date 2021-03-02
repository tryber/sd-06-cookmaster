const { getAllUsers, createUser } = require('./UsersService');
const { getAllRecipes, createRecipe, getRecipeById } = require('./RecipesService');

module.exports = {
  getAllUsers,
  createUser,
  getAllRecipes,
  createRecipe,
  getRecipeById,
};
