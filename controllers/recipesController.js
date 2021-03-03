const { Router } = require('express');
const {
  validateRecipe,
  validateToken,
  recipeCreate,
  getAllRecipes,
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

module.exports = { recipesRouter };
