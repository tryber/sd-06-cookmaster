const { Router } = require('express');
const { AuthorizationLoginRecipes, validateId } = require('../middlewares/verifyAuthorization');
const { verifyItensRecipes } = require('../middlewares/verifyRecipes');
const validateToken = require('../services/auth/validateToken');
const recipesService = require('../services/recipesService');
const resolveProblem = require('../middlewares/validateIdMode');

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
    const payload = await validateToken(authorization);
    const { _id } = payload;
    if (!authorization) return response(codeErr).json({ message: 'jwt malformed' });
    const createRecipes = await recipesService.registerRecipes(
      name,
      ingredients,
      preparation,
      _id,
    );
    return response.status(code).json(createRecipes);
  },
);

recipesController.get('/:id', resolveProblem, validateId, async (request, response) => {
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

recipesController.delete('/:id', resolveProblem, async (request, response) => {
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  const recipesDel = {
    _id: id,
    name,
    ingredients,
    preparation,
  };
  await recipesService.deleteOneRecipes(id);
  return response.status(code200).json(recipesDel);
});

recipesController.put('/:id', resolveProblem, AuthorizationLoginRecipes, validateId,
async (request, response) => {
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  const recipesEdit = {
    _id: id,
    name,
    ingredients,
    preparation,
  };
  await recipesService.putEditListId(id, name, ingredients, preparation);
  return response.status(code200).json(recipesEdit);
});

module.exports = recipesController;
