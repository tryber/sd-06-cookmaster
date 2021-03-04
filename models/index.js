const users = require('./users');
const login = require('./login');
const {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
} = require('./recipes');

module.exports = {
  users,
  login,
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
};
