const recipes = require('../Models/recipes');

const createRecipeService = async (name, ingredients, preparation, userId) => (
  recipes.createRecipe(name, ingredients, preparation, userId)
);

module.exports = {
  createRecipeService,
};