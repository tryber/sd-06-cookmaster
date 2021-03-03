const { Router } = require('express');

const {
  validationRecipesBody,
} = require('../middleware/recipesMiddleware');

const {
  verifyAuthorization,
} = require('../middleware/verfyAuthorization');

const {
  registerRecipe,
  getAllRecipes,
} = require('../services/recipesServices');

const recipesRouter = Router();

recipesRouter.get('/',
  async (_req, res) => {
    const recipes = await getAllRecipes();
    res.status(200).json(recipes);
  });

recipesRouter.post('/',
  verifyAuthorization,
  validationRecipesBody,
  async (req, res) => {
    const { body, headers } = req;
    const recipe = await registerRecipe(body, headers);
    res.status(201).json(recipe);
  });

module.exports = recipesRouter;
