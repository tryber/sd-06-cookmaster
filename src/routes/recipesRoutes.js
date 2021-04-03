const { Router } = require('express');

const { verifyAuthorization } = require('../auth/verifyAuthorization');
const recipesController = require('../controllers/RecipesController');

const recipeRoutes = Router();

recipeRoutes.post('/', verifyAuthorization, recipesController.createRecipeControler);

module.exports = recipeRoutes;