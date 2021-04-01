const rescue = require('express-rescue');
const { Router } = require('express');

const { verifyToken } = require('../auth/validateJWT');
const { validateRecipes } = require('../middlewares/validateRecipes');

const {
  validateCreateRecipe,
  recipeDetailsById,
  editRecipeById,
} = require('../service/recipeService');

const { getAllRecipes } = require('../model/recipesModel');
const { CREATED, NOT_FOUND, OK, UNAUTHORIZED } = require('../utils/statusCodeHandler');
const { invalidToken } = UNAUTHORIZED.message;

const recipesController = Router();

recipesController.post('/', verifyToken, validateRecipes, rescue(async (request, response) => {
  const { userId } = request;
  const createdRecipe = await validateCreateRecipe(request.body, userId);

  response.status(CREATED).json({ recipe: createdRecipe });
}));

recipesController.put('/:id', verifyToken, rescue(async (request, response) => {
  const { userId } = request;
  const { id } = request.params;
  const recipe = request.body;

  const recipeEdited = await editRecipeById(id, userId, recipe);

  if (!recipeEdited) return response.status(UNAUTHORIZED.code).json({ message: invalidToken });

  response.status(OK).json(recipeEdited);
}));

recipesController.get('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const recipeDetail = await recipeDetailsById(id);

  if (!recipeDetail) return response.status(NOT_FOUND.code).json({ message: NOT_FOUND.message });
  response.status(200).json(recipeDetail);
}));

recipesController.get('/', rescue(async (_, response) => {
  const listOfAllRecipes = await getAllRecipes();

  response.status(200).json(listOfAllRecipes);
}));

module.exports = { recipesController };
