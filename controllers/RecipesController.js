const { Router } = require('express');

const { CREATED, SUCCESS, NOT_FOUND } = require('../utils');

const { getAllRecipes, createRecipe, getRecipeById, updateRecipe } = require('../services');
const { validateJWT, validateRecipe } = require('../middlewares');

const routerRecipes = Router();

routerRecipes.post('/', validateJWT, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipeCreated = await createRecipe(userId, name, ingredients, preparation);
  return res.status(CREATED).json(recipeCreated);
});

routerRecipes.get('/', async (_req, res) => {
  const getAll = await getAllRecipes();
  return res.status(SUCCESS).json(getAll);
});

routerRecipes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  return res.status(SUCCESS).json(recipe);
});

routerRecipes.put('/:id', validateJWT, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id: recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);
  if (!recipe) return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  const { _id: userId } = req.user;
  const recipeUpdated = await updateRecipe(recipeId, userId, name, ingredients, preparation);
  return res.status(SUCCESS).json(recipeUpdated);
});
module.exports = routerRecipes;
