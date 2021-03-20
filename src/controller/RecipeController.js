const { Router } = require('express');
const { CREATED, OK } = require('../dictionary/statusCodes');
const RecipeService = require('../service/RecipeService');
const {
  validateRecipeExistence,
  validateRecipeMandatoryFields,
  validateToken,
} = require('../middleware/validations');

const RecipeController = new Router();

RecipeController.post(
  '/',
  validateToken,
  validateRecipeMandatoryFields,
  async (request, response) => {
    const recipe = request.body;
    const createdRecipe = await RecipeService.createRecipe(recipe);

    response.status(CREATED).json(createdRecipe);
  },
);

RecipeController.get(
  '/',
  async (_request, response) => {
    const foundRecipes = await RecipeService.findAll();

    response.status(OK).json(foundRecipes);
  },
);

RecipeController.get(
  '/:id',
  validateRecipeExistence,
  async (request, response) => {
    const { id } = request.params;

    const foundRecipe = await RecipeService.findById(id);

    response.status(OK).json(foundRecipe);
  },
);

module.exports = RecipeController;