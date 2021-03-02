const { Router } = require('express');
const { CREATED, SUCCESS } = require('../utils');

const { getAllRecipes, createRecipe } = require('../services');
const { validateJWT } = require('../middlewares');

const routerRecipes = Router();

routerRecipes.post('/', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  console.log('userId:', userId);
  const recipeCreated = await createRecipe(userId, name, ingredients, preparation);
  return res.status(CREATED).json(recipeCreated);
});

routerRecipes.get('/', async (_req, res) => {
  const getAll = await getAllRecipes();
  return res.status(SUCCESS).json({ recipes: getAll });
});

module.exports = routerRecipes;
