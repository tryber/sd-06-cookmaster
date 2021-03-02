const Recipes = require('../model/RecipesModel');

const createRecipe = async (recipeData) =>
  Recipes.createRecipe(recipeData);

const getAll = async () => Recipes.getAll();

const getById = async (id) => Recipes.getById(id);

const updateRecipe = async (id, recipeData) =>
  Recipes.updateRecipe(id, recipeData);

const deleteRecipe = async (id) =>
  Recipes.deleteRecipe(id);

  module.exports = {
    createRecipe,
    getAll,
    getById,
    updateRecipe,
    deleteRecipe,
  };
