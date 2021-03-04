const { ObjectID } = require('mongodb');
const { Router } = require('express');
const {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
} = require('../models');
const verifyRecipe = require('../middlewares/recipes');
const tokenMiddleware = require('../middlewares/token');

const recipesRouter = Router();

recipesRouter.post('/', tokenMiddleware, verifyRecipe, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.payload.user;
    const recipe = await createRecipes({ name, ingredients, preparation, userId });
    if (recipe) {
      return res.status(201).json(recipe);
    }
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
});

recipesRouter.get('/', async (_req, res) => {
  const allRecipes = await getAllRecipes();
  return res.status(200).json(allRecipes);
});

recipesRouter.get('/:id', async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  const recipeById = await getRecipeById(req.params.id);
  if (!recipeById) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(recipeById);
});

recipesRouter.put('/:id', tokenMiddleware, async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const { id } = req.params;
    const payload = { name, ingredients, preparation };
    const updateRecipe = await editRecipeById(id, payload, userId);
    return res.status(200).json(updateRecipe);
  } catch (err) {
    res.status(500).json({ message: console.log(err) });
  }
});

recipesRouter.delete('/:id', tokenMiddleware, async (req, res) => {
  try {
    const recipeById = await getRecipeById(req.params.id);
    if (!recipeById) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    await deleteRecipe(req.params.id);
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = recipesRouter;
