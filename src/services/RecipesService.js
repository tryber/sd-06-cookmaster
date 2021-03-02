const { RecipesModel } = require('../models');

const registerNewRecipe = async (name, ingredients, preparation) => RecipesModel
  .registerNewRecipe(name, ingredients, preparation);

const listAllRecipes = async () => RecipesModel
  .listAllRecipes();

const listRecipeById = async (id) => {
  const recipeById = await RecipesModel
    .listRecipeById(id);
  
  if (!recipeById) {
    return {
      error: true,
      message: 'recipe not found',
    };
  }

  return recipeById;
};

const editRecipe = async (id, name, ingredients, preparation) => RecipesModel
  .editRecipe(id, name, ingredients, preparation);

const deleteRecipe = async (id) => RecipesModel
  .deleteRecipe(id);

module.exports = {
  registerNewRecipe,
  listAllRecipes,
  listRecipeById,
  editRecipe,
  deleteRecipe,
};
