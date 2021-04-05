const { Router } = require('express');
const {
  addRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
  validateToken,
  validRecipe,
  validId,
} = require('../Services/recipes');

const { getOneUser } = require('../Services/users');

const recipesRouter = new Router();

recipesRouter.post('/', validateToken, validRecipe, async (req, res) => {
  const { email } = req.user;
  const { _id } = await getOneUser(email);
  const recipe = { ...req.body, userId: _id };
  await addRecipe(recipe);
  return res.status(201).json({ recipe });
});

recipesRouter.get('/', async (_req, res) => {
  const recipes = await getAllRecipes();
  return res.status(200).json(recipes);
});

recipesRouter.get('/:id', validId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getOneRecipe(id);
  if (!recipe) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(recipe);
});

recipesRouter.put('/:id', validateToken, validId, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const checkForUpdate = await updateRecipe(id, name, ingredients, preparation);
  const addNewRecipe = { ...checkForUpdate, name, ingredients, preparation };
  return res.status(200).json(addNewRecipe);
});

recipesRouter.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteRecipe(id);
  return res.status(204).json();
});

module.exports = recipesRouter;
