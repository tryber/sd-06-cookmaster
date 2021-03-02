const { ObjectId } = require('mongodb');
const RecipesModel = require('../models/RecipesModel');

const getAllRecipes = async () => {
  const allRecipes = await RecipesModel.getAllRecipes();
  return allRecipes;
};

const createRecipe = async (userId, name, ingredients, preparation) => {
  const { recipeId } = await RecipesModel.createRecipe(userId, name, ingredients, preparation);
  // console.log(recipeId);
  return ({
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: recipeId,
    },
  });
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await RecipesModel.getRecipeById(ObjectId(id));
  return recipe;
};

const updateRecipe = async (...params) => {
  const [recipeId, userId, name, ingredients, preparation] = params;
  // console.log('Service:', recipeId, userId, name, ingredients, preparation);
  await RecipesModel.updateRecipe(recipeId, name, ingredients, preparation);
  // console.log('Id do usuario: ', userId); 
  return ({
    name,
    ingredients,
    preparation,
    userId,
    _id: recipeId,
  });
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
};
