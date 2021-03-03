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
  getRecipeById,
} = require('../services/recipesServices');

const {
  objMessageError,
} = require('../useful/funcsObjUseful');

const recipesRouter = Router();

recipesRouter.get('/',
  async (_req, res) => {
    const recipes = await getAllRecipes();
    res.status(200).json(recipes);
  });

recipesRouter.get('/:id',
  async (req, res) => {
    const { id } = req.params;
    const recipes = await getRecipeById(id);
    if (!recipes) return res.status(404).json(objMessageError('recipe not found'));
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
