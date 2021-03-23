const { Router } = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const {
  newRecipe,
  searchAllRecipes,
  findRecipeById,
  toUpdateRecipe,
  recipeToDelete,
  pushImageRecipe,
} = require('../service/recipeServices');
const {
  validateRecipe,
  verifyAuthorization,
  verifyExistRecipe,
} = require('../service/validatesRecipe');

const router = Router();
const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;

router.post('/', validateRecipe, verifyAuthorization, async (req, res) => {
  const recipeBody = req.body;
  const { _id } = req.payload;
  recipeBody.userId = _id;
  const addNewRecipe = await newRecipe(recipeBody);
  return res.status(CREATED).json({ recipe: addNewRecipe.ops[0] });
});

router.get('/', async (_req, res, _next) => {
  const allRecipes = await searchAllRecipes();
  return res.status(SUCCESS).json(allRecipes);
});

router.get('/:id', verifyExistRecipe, async (req, res) => {
  const { id } = req.params;
  const foundedRecipe = await findRecipeById(id);
  return res.status(SUCCESS).json(foundedRecipe);
});

router.put('/:id', verifyExistRecipe, verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const recipeToUpdate = req.body;
  const foundedRecipe = await findRecipeById(id);
  recipeToUpdate.userId = foundedRecipe.userId;
  const recipe = await toUpdateRecipe(id, recipeToUpdate);
  return res.status(SUCCESS).json(recipe);
});

router.delete('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  await recipeToDelete(id);
  return res.status(NO_CONTENT).json();
});

router.put('/:id/image/', verifyExistRecipe, verifyAuthorization,
  upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const searchRecipe = await findRecipeById(id);
  searchRecipe.image = `localhost:3000/images/${id}.jpeg`;
  const objectToAddImage = { id, searchRecipe };
  await pushImageRecipe(objectToAddImage);
  res.status(SUCCESS).json(searchRecipe);
});

module.exports = router;
