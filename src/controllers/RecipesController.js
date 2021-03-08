const { Router } = require('express');
const { CreateRecipe, GetAllRecipes } = require('../services/RecipesServices');
const VerifyAuthotization = require('../middlewares/VerifyAuthotization');

const RecipesController = new Router();

RecipesController.post('/', VerifyAuthotization, CreateRecipe);

RecipesController.get('/', GetAllRecipes);

module.exports = RecipesController;