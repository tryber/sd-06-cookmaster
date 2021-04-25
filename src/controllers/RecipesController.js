const { Router } = require('express');
const VerifyAuthotization = require('../middlewares/VerifyAuthotization');
const { 
  CreateRecipe,
  GetAllRecipes,
  GetRecipeById,
  UpdateRecipe, 
  DeleteRecipe, 
  } = require('../services/RecipesServices');

const RecipesController = new Router();

RecipesController.post('/', VerifyAuthotization, CreateRecipe);

RecipesController.get('/', GetAllRecipes);

RecipesController.get('/:id', GetRecipeById);

RecipesController.delete('/:id', VerifyAuthotization, DeleteRecipe);

RecipesController.put('/:id', VerifyAuthotization, UpdateRecipe);

module.exports = RecipesController;