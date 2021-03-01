const { Router } = require('express');
const { validateToken,
  recipeCreate,
  validateRecipe,
  getAllRecipes, 
  getRecipeById, 
  validateId } = require('../services/recipesServices');
const { findOneUser } = require('../models/usersModel');
const { CREATED, SUCCESS, NOTFOUND } = require('../variables');

const recipesRouter = new Router();

recipesRouter.post('/', validateToken, validateRecipe, async (req, res) => {
  const { email } = req.user;
  const user = await findOneUser(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };
  await recipeCreate(req.body);

  res.status(CREATED).json({ recipe });
});

recipesRouter.get('/', async (_req, res) => {
  const recipes = await getAllRecipes();

  res.status(SUCCESS).json(recipes);
});

recipesRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);

  if (!recipe) return res.status(NOTFOUND).json({ message: 'recipe not found' });

  res.status(SUCCESS).json(recipe);
});

module.exports = { recipesRouter };
