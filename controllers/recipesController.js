const { Router } = require('express');
const {
  validateRecipe,
  validateToken,
  recipeCreate,
  getAllRecipes,
  getRecipeById,
  validateId,
} = require('../services/recipesServices');
const { findOneUser } = require('../models/usersModel');

const recipesRouter = new Router();

recipesRouter.post('/', validateToken, validateRecipe, async (req, res) => {
  const { email } = req.user;
  const user = await findOneUser(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };
  await recipeCreate(recipe);

  res.status(201).json({ recipe });
});

recipesRouter.get('/', async (_req, res) => {
  const recipes = await getAllRecipes();

  res.status(200).json(recipes);
});

recipesRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  res.status(200).json(recipe);
});

module.exports = { recipesRouter };
