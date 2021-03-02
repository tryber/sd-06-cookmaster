const { Router } = require('express');
const {
  createNewRecipe,
  getAllRecipes,
  getRecipesById,
  putRecipe,
  delRecipe,
  validateRecipes,
  validateId,
} = require('../Model/recipeModel');

const RecipeRouter = new Router();

const RESOLVE = 200;

RecipeRouter.get('/', async (req, res) => {
  const allRecipes = getAllRecipes;
  res.status(RESOLVE).json(allRecipes);
});
