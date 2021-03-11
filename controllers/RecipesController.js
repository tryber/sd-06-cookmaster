const jwt = require('jsonwebtoken');
const { Router } = require('express');
const multer = require('multer');
const {
  getAllRecipesService,
  createRecipeService,
  getByIdService,
  editRecipeService,
  deleteRecipeService,
  addImageService,
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
const NO_CONTENT = 204;
const secret = 'shhhh...é segredo';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({
  storage,
});

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

routerRecipes.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteRecipeService(id);
  return res.status(NO_CONTENT).end();
});

routerRecipes.put('/:id/image', validateToken, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const pathImage = `localhost:3000/images/${id}.jpeg`;
  await addImageService(id, pathImage);
  const recipe = await getByIdService(id);
  res.status(SUCCESS).json(recipe);
});

module.exports = routerRecipes;
