const { Router } = require('express');
const recipesService = require('../service/recipesService');
const validation = require('../service/validations/recipeValidation');
const tValidation = require('../service/validations/tokenValidation');

const routerRecipes = new Router();

routerRecipes.post('/', validation.recipeValidation, tValidation.tokenValidation,
async (req, res) => {
  const recipe = req.body;
  const { userId } = req.res.locals;
  const newRecipe = await recipesService.createRecipe(recipe, userId);
  return res.status(201).json(newRecipe);
});

routerRecipes.get('/', async (req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(200).json(recipes);
});

routerRecipes.use('/', async (error, req, res, _next) => {
  console.log('recipes error', error);
  return res.status(error.status).json({ message: error.message });
});

module.exports = routerRecipes;