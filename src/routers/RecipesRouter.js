const { Router } = require('express');
const { RecipesController } = require('../controllers');

const RecipeRouter = Router();

RecipeRouter.post('/', RecipesController.registerNewRecipe);
RecipeRouter.get('/', RecipesController.listAllRecipes);

module.exports = RecipeRouter;
