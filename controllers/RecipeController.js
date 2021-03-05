const { Router } = require('express');
const validatedToken = require('../authorization/validate');
const RecipeService = require('../services/RecipeServices');
const verifiedEmptyFields = require('../middlewares/verifyFieldsRecipe');
const verifyToken = require('../middlewares/verifyToken');

const RecipeController = Router();
const STATUS_201 = 201;
const STATUS_200 = 200;

RecipeController.get('/', async (request, response) => {
  const allRecipes = await RecipeService.getRecipes();
  return response.status(STATUS_200).json(allRecipes);
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

module.exports = RecipeController;
