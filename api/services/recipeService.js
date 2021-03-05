const { ObjectId } = require('mongodb');
const Model = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) throw Error('Invalid entries. Try again.');

  const recipe = await Model.createRecipe(name, ingredients, preparation);
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await Model.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const isIdValid = ObjectId.isValid(id);
  if (isIdValid === false) throw Error('recipe not found');

  const recipe = await Model.findById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
