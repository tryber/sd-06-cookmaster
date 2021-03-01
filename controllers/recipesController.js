const { Router } = require('express');
const { validateToken, recipeCreate, validateRecipe } = require('../services/recipesServices');
const { findOneUser } = require('../models/usersModel');
const { CREATED } = require('../variables');

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

module.exports = { recipesRouter };
