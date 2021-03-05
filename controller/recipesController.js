const { Router } = require('express');
const recipesService = require('../service/recipesService');
const valid = require('../service/validations/recipeValidation');
const validTkn = require('../service/validations/tokenValidation');

const routerRecipes = new Router();

routerRecipes.post('/', valid.createRecipeValidation, validTkn.tokenValidation,
async (req, res) => {
  const recipe = req.body;
  const { userId } = res.locals;
  console.log('userId', userId)
  const newRecipe = await recipesService.createRecipe(recipe, userId);
  return res.status(201).json(newRecipe);
});

routerRecipes.get('/:id', valid.recipeByIdValidation, async (req, res) => {
  const { recipe } = res.locals;
  return res.status(200).json(recipe);
});

routerRecipes.get('/', async (_req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(200).json(recipes);
});

routerRecipes.use('/', async (error, req, res, _next) => {
  console.log('recipes error', error);
  return res.status(error.status).json({ message: error.message });
});

module.exports = routerRecipes;