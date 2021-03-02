const { getAllUsers, createUser } = require('./UsersService');
const { getAllRecipes, createRecipe, getRecipeById, updateRecipe } = require('./RecipesService');

module.exports = {
  getAllUsers,
  createUser,
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
};
