const recipes = require('../Models/recipes');

const createRecipeService = async (name, ingredients, preparation, userId) => (
  recipes.createRecipe(name, ingredients, preparation, userId)
);

const listRecipesService = async () => (
  recipes.listRecipes()
);

const recipeByIdService = async (id) => (
  recipes.recipeById(id)
);

const updateRecipeService = async (id, name, ingredients, preparation) => (
  recipes.updateRecipe(id, name, ingredients, preparation)
);

const deleteRecipeService = async (id) => (
  recipes.deleteRecipe(id)
);
module.exports = {
  createRecipeService,
  listRecipesService,
  recipeByIdService,
  updateRecipeService,
  deleteRecipeService,
};