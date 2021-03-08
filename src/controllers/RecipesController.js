const { Router } = require('express');
const VerifyAuthotization = require('../middlewares/VerifyAuthotization');
const { 
  CreateRecipe,
  GetAllRecipes,
  GetRecipeById,
  UpdateRecipe, 
  } = require('../services/RecipesServices');

const RecipesController = new Router();

RecipesController.post('/', VerifyAuthotization, CreateRecipe);

RecipesController.get('/', GetAllRecipes);

RecipesController.get('/:id', GetRecipeById);

RecipesController.put('/', VerifyAuthotization, UpdateRecipe);

module.exports = RecipesController;