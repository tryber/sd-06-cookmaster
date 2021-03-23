const { Router } = require('express');
const multer = require('multer');
const { getUserByEmail } = require('../Services/loginService');
const {
  createNewRecipe,
  fetchImage,
  excludeRecipe,
  getAllRecipes,
  getRecipeById,
  putRecipe,
  validateId,
  validateRecipe,
} = require('../Services/recipesService');
const { validateToken } = require('../Authentication/validateToken');
const { validateRecipesHash } = require('../Authentication/validateRecipesHash');


const RecipesRouter = new Router();

const SucessCode = 200;
const CreatedCode = 201;
const NoContentCode = 204;
const NotFoundedCode = 404;

RecipesRouter.get('/', async (_req, res) => {
  const allRecipes = await getAllRecipes();
  return res.status(200).json(allRecipes);
});

RecipesRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(NotFoundedCode).json({
      message: 'recipe not found',
    });
  }
  return res.status(SucessCode).json(recipe);
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
  return res.status(CreatedCode).json({ recipe });
});

RecipesRouter.put('/:id', validateRecipesHash, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const oldRecipe = await putRecipe(id, name, ingredients, preparation);
  const editedRecipe = { ...oldRecipe, name, ingredients, preparation };
  return res.status(SucessCode).json(editedRecipe);
});

RecipesRouter.delete('/:id', validateRecipesHash, async (req, res) => {
  const { id } = req.params;
  await excludeRecipe(id);
  return res.status(NoContentCode).json();
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

RecipesRouter.put('/:id/image', validateId, validateRecipesHash,
  upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const imagePath = `localhost:3000/images/${filename}`;

  
  await fetchImage(id, imagePath);
  const result = await getRecipeById(id);

  return res.status(SucessCode).json(result);
  });

module.exports = { RecipesRouter }; 
