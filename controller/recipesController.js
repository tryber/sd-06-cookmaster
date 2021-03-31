const rescue = require('express-rescue');
const { Router } = require('express');
const { verifyToken } = require('../auth/validateJWT');
const { validateRecipes } = require('../middlewares/validateRecipes');
const { validateCreateRecipe } = require('../service/recipeService');

const { OK } = require('../utils/statusCodeHandler');

const recipesController = Router();

recipesController.post('/', verifyToken, validateRecipes, rescue(async (request, response) => {
  const { auth } = request;
  const createdRecipe = await validateCreateRecipe(request.body, auth.id);
  response.status(OK).json({ recipe: createdRecipe });
}));

module.exports = { recipesController };
