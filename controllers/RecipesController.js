const { Router } = require('express');
const multer = require('multer');
const validateJWT = require('../auth/validateJWT');
const RecipesService = require('../services/RecipesService');

const {
  checkRecipeFields,
  validateRecipeId,
  checkPermissions,
} = require('../middlewares');

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
  checkRecipeFields,
  validateJWT,
  async (request, response) => {
    const { _id: userId } = request.user;
    const { name, ingredients, preparation } = request.body;
    const registeredRecipe = await RecipesService
      .create(name, ingredients, preparation, userId);
    response.status(CREATED).json(registeredRecipe);
  });

  router.get('/', async (request, response) => {
    const recipes = await RecipesService.getAll();
    response.status(OK).json(recipes);
  });

  router.get('/:id', validateRecipeId, async (request, response) => {
    const { id } = request.params;
    const requestedRecipe = await RecipesService.findById(id);
    if (requestedRecipe.error) {
      return response
        .status(requestedRecipe.error.code)
        .json(requestedRecipe.error.message);
    }
    response.status(OK).json(requestedRecipe);
  });

  router.put('/:id',
    checkRecipeFields,
    validateJWT,
    checkPermissions,
    async (request, response) => {
      const { id: recipeId } = request.params;
      const { name, ingredients, preparation } = request.body;
      const newDataFromRecipe = { recipeId, name, ingredients, preparation };
      const updatedRecipe = await RecipesService.update(newDataFromRecipe);

      if (updatedRecipe.error) {
        return response.status(updatedRecipe.error.code).json(updatedRecipe.error.message);
      }
      response.status(OK).json(updatedRecipe);
    });

    router.put('/:id/image',
      validateJWT,
      checkPermissions,
      upload.single('image'),
      async (request, response) => {
        const { id } = request.params;
        const imageUrl = `localhost:3000/images/${id}.jpeg`;
        const updatedRecipe = await RecipesService.insertRecipeImage(id, imageUrl);
        if (updatedRecipe.error) {
          return response.status(updatedRecipe.error.code).json(updatedRecipe.error.message);
        }
        response.status(OK).json(updatedRecipe);
    });

    router.delete('/:id',
      validateJWT,
      checkPermissions,
      async (request, response) => {
        const { id } = request.params;
        const removedRecipe = await RecipesService.remove(id);
        if (removedRecipe.error) {
          return response
            .status(removedRecipe.error.code)
            .json(removedRecipe.error.message);
        }
        response.status(NO_CONTENT).end();
      });

module.exports = router;
