const multer = require('multer');
const { Router } = require('express');
// var path = require('path');

const { 
  validateToken,
  validateRecipe,
  validateExistingRecipe,
} = require('../Middlewares/validation');

const { 
  createRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeService,
  deleteRecipeService,
  updateImageService,
} = require('./recipeService');

const recipeRouter = Router();
const CREATED = 201;
const SUCCESS = 200;
const NO_CONTENT = 204;

recipeRouter.post('/', validateRecipe, validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const sendRecipe = { name, ingredients, preparation, userId: req.user };
  const id = await createRecipeService(sendRecipe);
  const newRecipe = { recipe: {
    name,
    ingredients,
    preparation,
    userId: req.user,
    _id: id,
    },
  };
  return res.status(CREATED).json(newRecipe);
});

recipeRouter.get('/', async (req, res) => {
  const allRecipes = await getAllRecipesService();
  return res.status(SUCCESS).json(allRecipes);
});

recipeRouter.get('/:id', validateExistingRecipe, async (req, res) => {
  const { recipe } = req.recipe;
  return res.status(SUCCESS).json(recipe);
});

recipeRouter.put('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  await updateRecipeService(id, name, ingredients, preparation);
  const updatedRecipe = await getRecipeByIdService(id);
  return res.status(SUCCESS).json(updatedRecipe);
});

recipeRouter.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteRecipeService(id);
  res.status(NO_CONTENT).json('ok');
});

const storage = multer.diskStorage({
  destination: (req, image, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, image, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

recipeRouter.put('/:id/image', validateToken, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { host } = req.headers;
  const { filename } = req.file;
  const pathname = `${host}/images/${filename}`;
  await updateImageService(id, pathname);
  const updated = await getRecipeByIdService(id);
  res.status(SUCCESS).json(updated);
});

// Another option for req. 10
// recipeRouter.get('/images/:id.jpeg', async (req, res) => {
//   const filePath = path.resolve(`./${req.url}`);
//   res.status(SUCCESS).sendFile(filePath);
// });

module.exports = recipeRouter;