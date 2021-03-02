const { Router } = require('express');
const {
  createNewRecipe,
  getAllRecipes,
  getRecipesById,
  putRecipe,
  delRecipe,
  validateRecipes,
  validateId,
} = require('../Services/recipesService');

const RecipeRouter = new Router();

const RESOLVE = 200;

RecipeRouter.get('/', async (_req, res) => {
  const allRecipes = await getAllRecipes();
  res.status(RESOLVE).json(allRecipes);
});

RecipeRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipesById(id);
  if (!recipe) {
    return res.status(RESOLVE).json({ message: 'recipe not found' });
  }
});

module.exports = { RecipeRouter };
