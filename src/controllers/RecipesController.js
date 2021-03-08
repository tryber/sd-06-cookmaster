const { Router } = require('express');
const { CreateRecipe, GetAllRecipes, GetRecipeById } = require('../services/RecipesServices');
const VerifyAuthotization = require('../middlewares/VerifyAuthotization');

const RecipesController = new Router();

RecipesController.post('/', VerifyAuthotization, CreateRecipe);

RecipesController.get('/', GetAllRecipes);

RecipesController.get('/:id', GetRecipeById);

module.exports = RecipesController;