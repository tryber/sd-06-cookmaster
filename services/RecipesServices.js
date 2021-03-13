const { RecipesModel } = require('../models');

const getAll = async () => RecipesModel.getAll();
const getById = async (id) => RecipesModel.getById(id);
const deleteRecipe = async (id) => RecipesModel.deleteRecipe(id);
const postRecipe = async (recipe, userId) => RecipesModel.postRecipe(recipe, userId);
const putRecipe = async (id, newRecipe, userId) => RecipesModel.putRecipe(id, newRecipe, userId);
const putImage = async (id, recipe, image) => RecipesModel
  .putImage(id, recipe, image);

module.exports = {
  getAll,
  getById,
  putImage,
  putRecipe,
  postRecipe,
  deleteRecipe,
};