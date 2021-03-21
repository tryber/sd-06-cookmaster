const RecipeModel = require('../model/RecipeModel');

const createRecipe = async (recipe) => (RecipeModel.createRecipe(recipe));

const findAll = async () => (RecipeModel.findAll());

const findById = async (id) => (RecipeModel.findById(id));

const updateRecipe = async (recipe) => (RecipeModel.updateRecipe(recipe));

module.exports = {
  createRecipe,
  findAll,
  findById,
  updateRecipe,
};