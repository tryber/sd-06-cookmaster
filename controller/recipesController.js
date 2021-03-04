const { Router } = require('express');
const { getUserByEmail } = require('../services/login');
const { validateToken } = require('../auth/validate');
const { validateRecipeToken } = require('../auth/validateRecipes');

const {
  validateRecipe,
  createNewRecipe,
  findAllRecipes,
  findOneRecipe,
  validateId,
  updateRecipe,
  delRecipe,
} = require('../services/recipes');

const recipeRouter = new Router();

recipeRouter.post('/', validateToken, validateRecipe, async (req, res) => {
  const { email } = req.user;
  const user = await getUserByEmail(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };
  await createNewRecipe(recipe);
  return res.status(201).json({ recipe });
});

recipeRouter.get('/', async (req, res) => {
  const allRecipes = await findAllRecipes();
  return res.status(200).json(allRecipes);
});

recipeRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await findOneRecipe(id);
  if (!recipe) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }
  return res.status(200).json(recipe);
});

recipeRouter.put('/:id', validateRecipeToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const oldRecipe = await updateRecipe(id, name, ingredients, preparation);
  const updatedRecipe = { ...oldRecipe, name, ingredients, preparation };
  return res.status(200).json(updatedRecipe);
});

recipeRouter.delete('/:id', validateRecipeToken, async (req, res) => {
  const { id } = req.params;
  await delRecipe(id);
  return res.status(204).json();
});

module.exports = { recipeRouter };