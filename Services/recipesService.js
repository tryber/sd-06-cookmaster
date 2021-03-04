const recipes = require('../Models/recipes');

const createRecipeService = async (name, ingredients, preparation, userId) => (
  recipes.createRecipe(name, ingredients, preparation, userId)
);

const listRecipesService = async () => (
  recipes.listRecipes()
);

module.exports = {
  createRecipeService,
  listRecipesService,
};