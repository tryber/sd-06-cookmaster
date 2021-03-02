const { Router } = require('express');
const {
  createNewRecipe,
  getAllRecipes,
  getRecipesById,
  putRecipe,
  delRecipe,
  validateRecipes,
  validateId,
} = require('../Services/recipesService');

const RecipeRouter = new Router();

const RESOLVE = 200;

RecipeRouter.get('/', async (req, res) => {
  const allRecipes = await getAllRecipes();
  res.status(RESOLVE).json(allRecipes);
});

module.exports = { RecipeRouter };
