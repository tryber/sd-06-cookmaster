const rescue = require('express-rescue');
const { Router } = require('express');
const HTTP = require('../utils/statusCodeHandler');

const { verifyToken } = require('../auth/validateJWT');
const { validateRecipes } = require('../middlewares/validateRecipes');
const { validateRole } = require('../middlewares/validateRole');
const { getAllRecipes, deleteRecipe } = require('../model/recipesModel');

const {
  validateCreateRecipe, recipeDetailsById, editRecipeById,
} = require('../service/recipeService');

const recipesController = Router();

recipesController.delete('/:id', verifyToken, validateRole, rescue(async (request, response) => {
  const { id } = request.params;
  await deleteRecipe(id);
  response.status(HTTP.NO_CONTENT).json();
}));

recipesController.post('/', verifyToken, validateRecipes,
  rescue(async (request, response) => {
    const { id } = request.user;
    const recipe = request.body;
    const createdRecipe = await validateCreateRecipe(recipe, id);

    response.status(HTTP.CREATED).json({ recipe: createdRecipe });
  }));

recipesController.put('/:id', verifyToken, validateRecipes,
  rescue(async (request, response) => {
    const { id } = request.params;
    const recipe = request.body;
    const { user } = request;
    const recipeEdited = await editRecipeById(id, recipe, user);

    if (!recipeEdited) {
      return response
        .status(HTTP.UNAUTHORIZED.code)
        .json({ message: HTTP.UNAUTHORIZED.invalidToken });
    }

    response.status(HTTP.OK).json(recipeEdited);
  }));

recipesController.get('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const recipeDetail = await recipeDetailsById(id);

  if (!recipeDetail) {
    return response.status(HTTP.NOT_FOUND.code).json({ message: HTTP.NOT_FOUND.message });
  }

  response.status(200).json(recipeDetail);
}));

recipesController.get('/', rescue(async (_, response) => {
  const listOfAllRecipes = await getAllRecipes();
  response.status(200).json(listOfAllRecipes);
}));

module.exports = { recipesController };
