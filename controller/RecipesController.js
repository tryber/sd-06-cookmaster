const { Router } = require('express');

const routes = Router();

const checkData = require('../middlewares/recipesMiddlewares');

const RecipesService = require('../services/RecipesService');

const createValidations = [
  checkData.validateAuthorization,
  checkData.fieldExists,
];

const updateValidations = [
  checkData.validateToken,
  checkData.validateAuthorization,
];

routes.post('/', createValidations, RecipesService.creatingRecipe);
routes.get('/', RecipesService.displayAllRecipes);
routes.get('/:id', checkData.isIdValid, RecipesService.displaySpecificRecipe);
routes.put('/:id', updateValidations, RecipesService.updatingRecipe);
routes.delete('/:id', checkData.validateToken, RecipesService.removingRecipe);

module.exports = routes;
