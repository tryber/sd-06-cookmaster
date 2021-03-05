const { Router } = require('express');
const validatedToken = require('../authorization/validate');
const RecipeService = require('../services/RecipeServices');

const RecipeController = Router();
const STATUS_201 = 201;

RecipeController.post('/', async (request, response) => {
  const { name, ingredients, preparation } = request.body;
  const { authorization } = request.headers;
  const { _id } = validatedToken(authorization);
  const idRecipe = await RecipeService.addRec(name, ingredients, preparation);
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
