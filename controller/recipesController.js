const { Router } = require('express');
const { AuthorizationLoginRecipes, validateId } = require('../middlewares/verifyAuthorization');
const { verifyItensRecipes } = require('../middlewares/verifyRecipes');
const recipesService = require('../services/recipesService');

const recipesController = new Router();
const code = 201;
const codeErr = 401;
const code200 = 200;
const codeError2 = 404;
// const msg = 'missing auth token';

recipesController.post(
  '/',
  verifyItensRecipes,
  AuthorizationLoginRecipes,
  async (request, response) => {
    const { authorization } = request.headers;
    const { name, ingredients, preparation } = request.body;
    if (!authorization) return response(codeErr).json({ message: 'jwt malformed' });
    const createRecipes = await recipesService.registerRecipes(
      name,
      ingredients,
      preparation,
      authorization,
    );
    return response.status(code).json(createRecipes);
  },
);

recipesController.get('/:id', validateId, async (request, response) => {
  const { id } = request.params;
  const returnRecipesId = await recipesService.getRecipesId(id);
  if (!returnRecipesId) {
    return response.status(codeError2).json({ message: 'Recipe not found' });
  }
  return response.status(code200).json(returnRecipesId);
});

recipesController.get('/', async (_request, response) => {
  const returnAllRecipes = await recipesService.getAllRecipes();
  return response.status(code200).json(returnAllRecipes);
});

recipesController.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  const recipesDel = {
    _id: id,
    name,
    ingredients,
    preparation,
  };
  const recipesDeleted = await recipesService.deleteOnerecipes(id);
  return response.status(code200).json(recipesDel);
});

recipesController.put('/:id', AuthorizationLoginRecipes, validateId,
async (request, response) => {
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  const recipesEdit = {
    _id: id,
    name,
    ingredients,
    preparation,
  };
  const returnEditRecipes = await recipesService.putEditListId(id, name, ingredients, preparation);
  return response.status(code200).json(recipesEdit);
});

module.exports = recipesController;
