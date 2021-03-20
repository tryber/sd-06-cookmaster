const RecipeModel = require('../model/RecipeModel');

const createRecipe = async (recipe) => (RecipeModel.createRecipe(recipe));

const findAll = async () => (RecipeModel.findAll());

module.exports = {
  createRecipe,
  findAll,
};