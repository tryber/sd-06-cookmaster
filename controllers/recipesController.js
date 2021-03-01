const { Router } = require('express');
const { validateToken,
  recipeCreate,
  validateRecipe,
  getAllRecipes } = require('../services/recipesServices');
const { findOneUser } = require('../models/usersModel');
const { CREATED, SUCCESS } = require('../variables');

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

module.exports = { recipesRouter };
