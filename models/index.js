const users = require('./users');
const {
  login,
  findUserByEmail,
} = require('./login');
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
  findUserByEmail,
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
};
