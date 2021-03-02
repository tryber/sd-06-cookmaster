const { createUser, getAllUsers, getByEmail } = require('./UsersModel');
const { getAllRecipes, createRecipe, getRecipe } = require('./RecipesModel');
const connection = require('./connection');

module.exports = {
  connection,
  createUser,
  getAllUsers,
  getByEmail,
  getAllRecipes,
  createRecipe,
  getRecipe,
};
