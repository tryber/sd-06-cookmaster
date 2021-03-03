const { RecipesModel } = require('../models');

const getAll = async () => RecipesModel.getAll();
const getById = async (id) => RecipesModel.getById(id);
const postRecipe = async (recipe, userId) => RecipesModel.postRecipe(recipe, userId);

module.exports = {
  getAll,
  getById,
  postRecipe,
};