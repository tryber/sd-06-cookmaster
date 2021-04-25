const { ObjectId } = require('mongodb');
const RecipesModel = require('../models/RecipesModel');

const getAllRecipes = async () => {
  const allRecipes = await RecipesModel.getAllRecipes();
  return allRecipes;
};

const createRecipe = async (userId, name, ingredients, preparation) => {
  const { recipeId } = await RecipesModel.createRecipe(userId, name, ingredients, preparation);
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
  await RecipesModel.updateRecipe(recipeId, name, ingredients, preparation);
  return ({
    name,
    ingredients,
    preparation,
    userId,
    _id: recipeId,
  });
};

const removeRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await getRecipeById(ObjectId(id));
  if (!recipe) return null;

  await RecipesModel.removeRecipe(ObjectId(id));
  return recipe;
};

const insertRecipeImage = async (id, imagePath) => {
  await RecipesModel.insertRecipeImage(ObjectId(id), imagePath);
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  insertRecipeImage,
};
