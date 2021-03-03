const jwt = require('jsonwebtoken');
const { Router } = require('express');

const {
  getAllRecipesService,
  createRecipeService,
  getByIdService,
  editRecipeService,
} = require('../services/RecipesService');
const {
  validateRecipe,
  validateToken,
  validateId,
  // validateAuth,
} = require('../middlewares/RecipesMid');

const routerRecipes = Router();
const CREATED = 201;
const SUCCESS = 200;
const secret = 'shhhh...é segredo';

routerRecipes.post('/', validateRecipe, validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const payload = jwt.verify(token, secret, {
    iss: 'Cookmaster',
    aud: 'identity',
  });
  const { _id: userId } = payload.userData;
  const recipeCreated = await createRecipeService(name, ingredients, preparation, userId);
  return res.status(CREATED).json({ recipe: recipeCreated });
});

routerRecipes.get('/', async (_req, res) => {
  const getAll = await getAllRecipesService();
  return res.status(SUCCESS).json(getAll);
});

routerRecipes.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getByIdService(id);
  return res.status(SUCCESS).json(recipe);
});

routerRecipes.put('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipeEdited = await editRecipeService(id, name, ingredients, preparation);
  return res.status(SUCCESS).json(recipeEdited);
});

module.exports = routerRecipes;
