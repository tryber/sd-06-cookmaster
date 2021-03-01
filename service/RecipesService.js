const RecipesModel = require('../model/RecipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => (
  RecipesModel.createRecipe(name, ingredients, preparation, userId)
);

module.exports = {
  createRecipe,
};
