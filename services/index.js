const { getAllUsers, createUser } = require('./UsersService');
const { getAllRecipes, createRecipe } = require('./RecipesService');

module.exports = {
  getAllUsers,
  createUser,
  getAllRecipes,
  createRecipe,
};
