const { Router } = require('express');
const { CREATED, OK } = require('../dictionary/statusCodes');
const RecipeService = require('../service/RecipeService');
const {
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

module.exports = RecipeController;