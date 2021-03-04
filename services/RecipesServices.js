const { RecipesModel } = require('../models');

const getAll = async () => RecipesModel.getAll();
const getById = async (id) => RecipesModel.getById(id);
const postRecipe = async (recipe, userId) => RecipesModel.postRecipe(recipe, userId);
const putRecipe = async (id, newRecipe, userId) => RecipesModel.putRecipe(id, newRecipe, userId);
const deleteRecipe = async (id) => RecipesModel.deleteRecipe(id);

module.exports = {
  getAll,
  getById,
  putRecipe,
  postRecipe,
  deleteRecipe,
};