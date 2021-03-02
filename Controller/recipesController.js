const { Router } = require('express');
const multer = require('multer');
const { getUserByEmail } = require('../Services/loginService');
const { validateToken } = require('../Auth/validateToken');
const {
  validateRecipe,
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  validateId,
  putRecipe,
  delRecipe,
  addImagePath,
} = require('../Services/recipesService');
const { validateRecipeToken } = require('../Auth/validateJWTRecipes');

const RecipesRouter = new Router();

const twoHundred = 200;
const twoHundredOne = 201;
const twoHundredFour = 204;
const fourHundredFour = 404;

RecipesRouter.get('/', async (_req, res) => {
  const allRecipes = await getAllRecipes();
  return res.status(200).json(allRecipes);
});

RecipesRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(fourHundredFour).json({
      message: 'recipe not found',
    });
  }
  return res.status(twoHundred).json(recipe);
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

  return res.status(twoHundredOne).json({ recipe });
});

RecipesRouter.put('/:id', validateRecipeToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const oldRecipe = await putRecipe(id, name, ingredients, preparation);

  const editedRecipe = { ...oldRecipe, name, ingredients, preparation };

  return res.status(twoHundred).json(editedRecipe);
});

RecipesRouter.delete('/:id', validateRecipeToken, async (req, res) => {
  const { id } = req.params;
  await delRecipe(id);
  
  return res.status(twoHundredFour).json();
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

RecipesRouter.put('/:id/image', validateId, validateRecipeToken,
  upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const imagePath = `localhost:3000/images/${filename}`;

  await addImagePath(id, imagePath);

  const result = await getRecipeById(id);

  return res.status(twoHundred).json(result);
  });

module.exports = { RecipesRouter };