const RecipeModel = require('../model/RecipeModel');

const addImageToRecipe = async (recipe) => (RecipeModel.addImageToRecipe(recipe));

const createRecipe = async (recipe) => (RecipeModel.createRecipe(recipe));

const findAll = async () => (RecipeModel.findAll());

const findById = async (id) => (RecipeModel.findById(id));

const removeRecipe = async (id) => (RecipeModel.removeRecipe(id));

const updateRecipe = async (recipe) => (RecipeModel.updateRecipe(recipe));

module.exports = {
  addImageToRecipe,
  createRecipe,
  findAll,
  findById,
  removeRecipe,
  updateRecipe,
};