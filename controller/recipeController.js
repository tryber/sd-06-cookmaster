const { Router } = require('express');
const { findUserByEmail } = require('../Model/usersModel');
const {
  createNewRecipe,
  getAllRecipes,
  getRecipesById,
  putRecipe,
  delRecipe,
  validateRecipes,
  validateId,
} = require('../Services/recipesService');
const { validateToken } = require('../Auth/validateToken');

const RecipeRouter = new Router();

const RESOLVE = 200;
const SUCCESS = 201;
const NO_CONTENT = 204;

RecipeRouter.post('/', validateToken, validateRecipes, async (req, res) => {
  const { email } = req.user;
  const user = await findUserByEmail(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };
  await createNewRecipe(recipe);

  return res.status(SUCCESS).json({ recipe });
});

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
  return res.status(RESOLVE).json(recipe);
});

RecipeRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const recipe = await putRecipe(id, name, ingredients, preparation);

  const newRecipe = { ...recipe, name, ingredients, preparation };

  return res.status(RESOLVE).json(newRecipe);
});

RecipeRouter.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  await delRecipe(id);

  res.status(NO_CONTENT).send();
});

module.exports = { RecipeRouter };
