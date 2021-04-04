const { Router } = require('express');

const { verifyAuthorization } = require('../auth/verifyAuthorization');
const recipesController = require('../controllers/RecipesController');

const recipeRoutes = Router();

recipeRoutes.post('/', verifyAuthorization, recipesController.createRecipeController);
recipeRoutes.get('/', recipesController.findAllRecipesController);
recipeRoutes.get('/:id', recipesController.findRecipeByIdController);

module.exports = recipeRoutes;