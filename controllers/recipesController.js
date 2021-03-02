const { Router } = require('express');
const {
  registerRecipe,
  getAllRecipes,
  findOneRecipe,
  validateId,
  updateRecipe,
} = require('../services/recipesService');

const {
  validateToken,
  verifyRecipe,
} = require('../services/recipesService');

const { getOneUser } = require('../services/usersService');

const recipesRouter = new Router();
const CREATED = 201;
const SUCCESS = 200;
const NOT_FOUND = 404;

recipesRouter.post('/', validateToken, verifyRecipe, async (request, response) => {
  const { email } = request.user;
  const { _id } = await getOneUser(email);
  const recipe = { ...request.body, userId: _id };
  await registerRecipe(recipe);
  return response.status(CREATED).json({ recipe });
});

recipesRouter.get('/', async (_request, response) => {
  const recipes = await getAllRecipes();
  return response.status(SUCCESS).json(recipes);
});

recipesRouter.get('/:id', validateId, async (request, response) => {
  const { id } = request.params;
  const recipe = await findOneRecipe(id);
  if (!recipe) return response.status(NOT_FOUND).json({ message: 'recipe not found' });
  return response.status(SUCCESS).json(recipe);
});

recipesRouter.put('/:id', validateToken, validateId, async (request, response) => {
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  const beforeUpdate = await updateRecipe(id, name, ingredients, preparation);
  const newRecipe = { ...beforeUpdate, name, ingredients, preparation };
  return response.status(SUCCESS).json(newRecipe);
});

module.exports = recipesRouter;
