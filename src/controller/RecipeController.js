const { Router } = require('express');
const statusCodes = require('../dictionary/statusCodes');
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

    response.status(statusCodes.CREATED).json(createdRecipe);
  },
);

module.exports = RecipeController;