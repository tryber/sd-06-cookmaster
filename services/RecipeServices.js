const RecipeModel = require('../models/recipe');

const addRec = async (name, ingredients, preparation, userId) => {
  const result = await RecipeModel.addRecipe(name, ingredients, preparation, userId);
  return result;
};

const getRecipes = async () => {
  const recipes = await RecipeModel.getAllRecipes();
  return recipes;
};

const getRecipeId = async (id) => {
  const recipe = await RecipeModel.getRecipeById(id);
  return recipe;
};

const editRecipeId = async (id, name, ingredients, preparation) => {
   await RecipeModel.editRecipe(id, name, ingredients, preparation);
};

const delRecipe = async (id) => {
  await RecipeModel.deleteRecipe(id);
};

module.exports = {
  addRec,
  getRecipes,
  getRecipeId,
  editRecipeId,
  delRecipe,
};
