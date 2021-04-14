const { Router } = require('express');
const multer = require('multer');
const {
  validateToken,
  validateName,
  validateIngredients,
  validatePreparation,
  validateId,
} = require('../middleware/recipeValidation');
const recipesServices = require('../services/recipesServices');

const router = Router();

const CREATE = 201;
const OK = 200;
const DELETED = 204;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.get('/', async (_req, res) => {
  const recipes = await recipesServices.getAllRecipes();

  res.status(OK).json(recipes);
});

router.get('/:id', validateId, async (req, res) => {
  const foundId = await recipesServices.findProductsById(req.params.id);

  res.status(OK).json(foundId);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateIngredients,
  validatePreparation,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { payload } = req;
    const recipes = await recipesServices.createRecipes(name, ingredients, preparation, payload.id);
    res.status(CREATE).json({ recipe: recipes });
  },
);

router.put('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  await recipesServices.updateRecipe(id, name, ingredients, preparation);
  const updatedRecipe = await recipesServices.findProductsById(id);
  res.status(OK).json(updatedRecipe);
});

router.put('/:id/image', upload.single('image'), validateToken, async (req, res) => {
  const { id } = req.params;
  const imagePath = `localhost:3000/images/${id}.jpeg`;
  await recipesServices.updateImages(id, imagePath);
  const updatedRecipeImage = await recipesServices.findProductsById(id);
  res.status(OK).json(updatedRecipeImage);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await recipesServices.deleteRecipes(id);
  res.status(DELETED).json();
});

module.exports = router;
