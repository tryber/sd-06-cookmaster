const { Router } = require('express');
const {
  registerRecipe,
  getAllRecipes,
  findOneRecipe,
  validateId,
} = require('../services/recipesService');

const {
  validateToken,
  verifyRecipe,
} = require('../services/recipesService');

const recipesRouter = new Router();
const CREATED = 201;
const SUCCESS = 200;
const NOT_FOUND = 404;

recipesRouter.post('/', validateToken, verifyRecipe, async (request, response) => {
  const { id } = request.user;
  const { name, ingredients, preparation } = request.body;
  const recipe = { name, ingredients, preparation, userId: id };
  await registerRecipe({ recipe });
  response.status(CREATED).json({ recipe });
});

recipesRouter.get('/', async (_request, response) => {
  const recipes = await getAllRecipes();
  response.status(SUCCESS).json(recipes);
});

recipesRouter.get('/:id', validateId, async (request, response) => {
  const { id } = request.params;
  const recipe = await findOneRecipe(id);
  if (!recipe) return response.status(NOT_FOUND).json({ message: 'recipe not found' });
  response.status(SUCCESS).json(recipe);
});

module.exports = recipesRouter;
