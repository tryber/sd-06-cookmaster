const { Router } = require('express');
const validatedToken = require('../authorization/validate');
const RecipeService = require('../services/RecipeServices');
const verifiedEmptyFields = require('../middlewares/verifyFieldsRecipe');
const verifyToken = require('../middlewares/verifyToken');
const verifyExistedRecipe = require('../middlewares/verifyExistedRecipe');

const RecipeController = Router();
const STATUS_200 = 200;
const STATUS_201 = 201;
const STATUS_204 = 204;

RecipeController.get('/', async (request, response) => {
  const allRecipes = await RecipeService.getRecipes();
  return response.status(STATUS_200).json(allRecipes);
});

RecipeController.get('/:id', verifyExistedRecipe, async (request, response) => {
  const { id } = request.params;
  const recipeFound = await RecipeService.getRecipeId(id);
  return response.status(STATUS_200).json(recipeFound);
});

RecipeController.post('/', verifiedEmptyFields, verifyToken, async (request, response) => {
  const { name, ingredients, preparation } = request.body;
  const { authorization } = request.headers;
  const { _id } = validatedToken(authorization);
  const idRecipe = await RecipeService.addRec(name, ingredients, preparation, _id);
  return response.status(STATUS_201).json({
    recipe: {
      name,
      ingredients,
      preparation,
      userId: _id,
      _id: idRecipe,
    },
  });
});

RecipeController.put('/:id', verifyToken, async (request, response) => {
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  await RecipeService.editRecipeId(id, name, ingredients, preparation);
  const recipeEdited = await RecipeService.getRecipeId(id);
  return response.status(STATUS_200).json(recipeEdited);
});

RecipeController.delete('/:id', verifyToken, async (request, response) => {
  const { id } = request.params;
  await RecipeService.delRecipe(id);
  return response.status(STATUS_204).end();
});

module.exports = RecipeController;
