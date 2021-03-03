const { Router } = require('express');
const multer = require('multer');

const { CREATED, SUCCESS, NOT_FOUND, NO_CONTENT } = require('../utils');

const {
  getAllRecipes, createRecipe, getRecipeById, updateRecipe, removeRecipe, insertRecipeImage,
} = require('../services');

const { validateJWT, validateRecipe } = require('../middlewares');

const message = 'recipe not found';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const routerRecipes = Router();

routerRecipes.post('/', validateJWT, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipeCreated = await createRecipe(userId, name, ingredients, preparation);
  return res.status(CREATED).json(recipeCreated);
});

routerRecipes.get('/', async (_req, res) => {
  const getAll = await getAllRecipes();
  return res.status(SUCCESS).json(getAll);
});

routerRecipes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) return res.status(NOT_FOUND).json({ message });
  return res.status(SUCCESS).json(recipe);
});

routerRecipes.put('/:id', validateJWT, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id: recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);
  if (!recipe) return res.status(NOT_FOUND).json({ message });
  const { _id: userId } = req.user;
  const recipeUpdated = await updateRecipe(recipeId, userId, name, ingredients, preparation);
  return res.status(SUCCESS).json(recipeUpdated);
});

routerRecipes.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const recipes = await removeRecipe(id);
  if (!recipes) return res.status(NOT_FOUND).json({ message });
  res.status(NO_CONTENT).json();
});

routerRecipes.put('/:id/image', validateJWT, upload.single('image'), async (req, res) => {
  // console.log(req.file);
  const { id } = req.params;
  const { filename } = req.file;
  const path = `localhost:3000/images/${filename}`;

  await insertRecipeImage(id, path);
  const recipe = await getRecipeById(id);
  return res.status(SUCCESS).json(recipe);
  });

module.exports = routerRecipes;
