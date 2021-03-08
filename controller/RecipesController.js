const { Router } = require('express');

const routes = Router();

const checkData = require('../middlewares/recipesMiddlewares');

const RecipesService = require('../services/RecipesService');

const dataValidation = [
  checkData.validateAuthorization,
  checkData.fieldExists,
];

routes.post('/', dataValidation, RecipesService.creatingRecipe);
routes.get('/', RecipesService.displayAllRecipes);

module.exports = routes;
