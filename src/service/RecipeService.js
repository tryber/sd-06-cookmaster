const RecipeModel = require('../model/RecipeModel');

const createRecipe = async (recipe) => (RecipeModel.createRecipe(recipe));

module.exports = {
  createRecipe,
};