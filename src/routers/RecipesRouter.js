const { Router } = require('express');
const { RecipesController } = require('../controllers');

const RecipeRouter = Router();

RecipeRouter.post('/', RecipesController.registerNewRecipe);

module.exports = RecipeRouter;
