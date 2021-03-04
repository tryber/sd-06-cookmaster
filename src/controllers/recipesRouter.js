const { Router } = require('express');
const rescue = require('express-rescue');

const {
  validationRecipesBody,
  verifyAutorOfRecipe,
} = require('../middleware/recipesMiddleware');

const {
  verifyAuthorization,
} = require('../middleware/verfyAuthorization');

const {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
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

recipesRouter.put('/:id',
  verifyAuthorization,
  verifyAutorOfRecipe,
  rescue(async (req, res) => {
    const { params: { id }, body } = req;
    const recipeUpdate = await updateRecipe(id, body);
    res.status(200).json(recipeUpdate);
  }));

recipesRouter.delete('/:id',
  verifyAuthorization,
  verifyAutorOfRecipe,
  rescue(async (req, res) => {
    const { id } = req.params;
    await deleteRecipe(id);
    res.status(204).end();
  }));

module.exports = recipesRouter;
