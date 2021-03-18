const { Router } = require('express');
const multer = require('multer');
const validingJWT = require('../uteis/validingJWT');
const recipesService = require('../service/recipesService');

const {
  validingRecipesField,
  validingRecipes,
  validingPermissions,
} = require('../middleware');

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });

const CREATED = 201;
const OK = 200;
const NO_CONTENT = 204;

router.post('/',
  validingRecipesField,
  validingJWT,
  async (req, res) => {
    const { _id: userId } = req.user;
    const { name, ingredients, preparation } = req.body;
    const result = await recipesService
      .create(name, ingredients, preparation, userId);
    res.status(CREATED).json(result);
  });

router.get('/', async (request, response) => {
  const recipes = await recipesService.getAll();
  response.status(OK).json(recipes);
});

router.get('/:id', validingRecipes, async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.findById(id);
  if (result.error) {
    return res
      .status(result.error.code)
      .json(result.error.message);
  }
  res.status(OK).json(result);
});

router.put('/:id',
  validingRecipesField,
  validingJWT,
  validingPermissions,
  async (req, res) => {
    const { id: recipeId } = req.params;
    const { name, ingredients, preparation } = req.body;
    const dataFromRecipe = { recipeId, name, ingredients, preparation };
    const result = await recipesService.update(dataFromRecipe);

    if (result.error) {
      return res.status(result.error.code).json(result.error.message);
    }
    res.status(OK).json(result);
  });

router.put('/:id/image',
  validingJWT,
  validingPermissions,
  upload.single('image'),
  async (request, response) => {
    const { id } = request.params;
    const imageUrl = `localhost:3000/images/${id}.jpeg`;
    const updatedRecipe = await recipesService.insertRecipeImage(id, imageUrl);
    if (updatedRecipe.error) {
      return response.status(updatedRecipe.error.code).json(updatedRecipe.error.message);
    }
    response.status(OK).json(updatedRecipe);
  });

router.delete('/:id',
  validingJWT,
  validingPermissions,
  async (req, res) => {
    const { id } = req.params;
    const result = await recipesService.remove(id);
    if (result.error) {
      return res
        .status(result.error.code)
        .json(result.error.message);
    }
    res.status(NO_CONTENT).end();
  });

module.exports = router;
