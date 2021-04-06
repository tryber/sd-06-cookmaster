const { Router } = require('express');
const multer = require('multer');
const {
  addRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
  validateToken,
  validRecipe,
  validId,
  addImagePath,
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

// REQ9
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });
recipesRouter.put('/:id/image', validId, validateToken,
  upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const imagePath = `localhost:3000/images/${filename}`;

  await addImagePath(id, imagePath);

  const result = await getOneRecipe(id);

  return res.status(200).json(result);
  });

module.exports = recipesRouter;
