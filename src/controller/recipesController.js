const { Router } = require('express');
const multer = require('multer');
const { searchLogin } = require('../services/loginService');
const { validateToken } = require('../auth/validateToken');
const {
  validateRecipe,
  createNewRecipe,
  searchAllRecipes,
  searchById,
  checkId,
  modifyRecipe,
  removeRecipe,
  imagePath } = require('../services/recipesServices');
const { validateRecipeToken } = require('../auth/validateJWTRecipes');

const recipes = new Router();

const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;

recipes.get('/', async (_req, res) => {
  const listRecipes = await searchAllRecipes();
  return res.status(SUCCESS).json(listRecipes);
});

recipes.get('/:id', checkId, async (req, res) => {
  const { id } = req.params;
  const recipe = await searchById(id);
  if (!recipe) {
    return res.status(NOT_FOUND).json({
      message: 'recipe not found',
    });
  }
  return res.status(SUCCESS).json(recipe);
});

recipes.post('/', validateToken, validateRecipe, async (req, res) => {
  const { email } = req.user;
  const user = await searchLogin(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };
  
  await createNewRecipe(recipe);

  return res.status(CREATED).json({ recipe });
});

recipes.put('/:id', validateRecipeToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const oldRecipe = await modifyRecipe(id, name, ingredients, preparation);

  const editedRecipe = { ...oldRecipe, name, ingredients, preparation };

  return res.status(SUCCESS).json(editedRecipe);
});

recipes.delete('/:id', validateRecipeToken, async (req, res) => {
  const { id } = req.params;
  await removeRecipe(id);
  
  return res.status(NO_CONTENT).json();
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

recipes.put('/:id/image', checkId, validateRecipeToken,
  upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const newImagePath = `localhost:3000/images/${filename}`;

  await imagePath(id, newImagePath);

  const result = await searchById(id);

  return res.status(SUCCESS).json(result);
  });

module.exports = { recipes };