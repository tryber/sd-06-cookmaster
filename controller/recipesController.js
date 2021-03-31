const rescue = require('express-rescue');
const { Router } = require('express');
const { verifyToken } = require('../auth/validateJWT');
const { validateRecipes } = require('../middlewares/validateRecipes');
const { validateCreateRecipe } = require('../service/recipeService');

const { CREATED } = require('../utils/statusCodeHandler');

const recipesController = Router();

recipesController.post('/', verifyToken, validateRecipes, rescue(async (request, response) => {
  const { userId } = request;
  const createdRecipe = await validateCreateRecipe(request.body, userId);
  response.status(CREATED).json({ recipe: createdRecipe });
}));

module.exports = { recipesController };
