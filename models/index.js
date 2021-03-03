const { createUser, getAllUsers, getByEmail } = require('./UsersModel');
const {
  getAllRecipes, createRecipe, getRecipeById, updateRecipe, removeRecipe, insertRecipeImage,
} = require('./RecipesModel');
const connection = require('./connection');

module.exports = {
  connection,
  createUser,
  getAllUsers,
  getByEmail,
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  insertRecipeImage,
};
