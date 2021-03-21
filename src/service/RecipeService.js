const RecipeModel = require('../model/RecipeModel');

const createRecipe = async (recipe) => (RecipeModel.createRecipe(recipe));

const findAll = async () => (RecipeModel.findAll());

const findById = async (id) => (RecipeModel.findById(id));

const updateRecipe = async (recipe) => (RecipeModel.updateRecipe(recipe));

const removeRecipe = async (id) => (RecipeModel.removeRecipe(id));

module.exports = {
  createRecipe,
  findAll,
  findById,
  removeRecipe,
  updateRecipe,
};