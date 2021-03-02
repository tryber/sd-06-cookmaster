const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { getAllRecipesService, createRecipeService } = require('../services/RecipesService');
const { validateRecipe, validateToken } = require('../middlewares/RecipesMid');

const routerRecipes = Router();

const CREATED = 201;
const SUCCESS = 200;

const secret = 'senha';

routerRecipes.post('/', validateRecipe, validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  const payload = jwt.verify(token, secret, {
    iss: 'Cookmaster',
    aud: 'identity',
  });

  const { _id: userId } = payload.userData;

  const recipeCreated = await createRecipeService(name, ingredients, preparation, userId);
  return res.status(CREATED).json(recipeCreated);
});

routerRecipes.get('/', async (_req, res) => {
  const getAll = await getAllRecipesService();
  return res.status(SUCCESS).json({ recipes: getAll });
});

module.exports = routerRecipes;
