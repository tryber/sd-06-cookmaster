const Recipes = require('../model/RecipesModel');

const createRecipe = async (recipeData) =>
  Recipes.createRecipe(recipeData);

const getAll = async () => Recipes.getAll();

const getById = async (id) => Recipes.getById(id);

const getUserId = async (userId) => Recipes.getUserId(userId);

const updateRecipe = async (id, recipeData) => Recipes.updateRecipe(id, recipeData);

const deleteRecipe = async (id) =>
  Recipes.deleteRecipe(id);

  const addImage = async (id, path) => 
  Recipes.addImage(id, path);

  module.exports = {
    createRecipe,
    getAll,
    getById,
    updateRecipe,
    deleteRecipe,
    addImage,
    getUserId,
  };
