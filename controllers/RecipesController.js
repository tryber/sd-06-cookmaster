const { Router } = require('express');
const {
  checkRecipeFields,
  validateRecipeId,
  checkPermissions,
} = require('../middlewares');

const validateJWT = require('../auth/validateJWT');
const RecipesService = require('../services/RecipesService');

const router = Router();

const CREATED = 201;
const OK = 200;

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

module.exports = router;
