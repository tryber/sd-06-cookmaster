const { Router } = require('express');
const { ObjectId } = require('mongodb');
const { getUserByEmail } = require('../service/loginService');
const { validateToken } = require('../auth/validateToken');
const { validateRecipeToken } = require('../auth/validateJWTRecipes');
const multer = require('../middleware/MulterConfig');
const {
  validateRecipe,
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  validateId,
  putRecipe,
  delRecipe,
} = require('../service/recipeService');

const RecipesRouter = new Router();

RecipesRouter.get('/', async (req, res) => {
  const allRecipes = await getAllRecipes();
  return res.status(200).json(allRecipes);
});

RecipesRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }
  return res.status(200).json(recipe);
});

RecipesRouter.post('/', validateToken, validateRecipe, async (req, res) => {
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

RecipesRouter.put('/:id', validateRecipeToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const oldRecipe = await putRecipe(id, name, ingredients, preparation);

  const editedRecipe = { ...oldRecipe, name, ingredients, preparation };

  return res.status(200).json(editedRecipe);
});

RecipesRouter.delete('/:id', validateRecipeToken, async (req, res) => {
  const { id } = req.params;
  console.log('cheguei aqui', id);
  await delRecipe(id);

  return res.status(204).json();
});

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });
RecipesRouter.put('/:id/image', upload.single('image'), validateToken, async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(404).json({ message: 'recipe not found' });
  const recipeImage = await upload(id);
  return res.status(200).json(recipeImage);
});
module.exports = { RecipesRouter };
