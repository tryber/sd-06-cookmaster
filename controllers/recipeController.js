const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, CREATED, SUCCESS } = require('../services/httpStatuses');
const { invalidEntries } = require('../services/messages');
const { fieldFinder } = require('../services/validators');
const { createRecipe, getAllRecipes } = require('../models/recipeModel');
const tokenVerifier = require('../auth/authenticationMiddleware');

const RecipeController = new Router();

RecipeController.post('/', tokenVerifier, async (req, res) => {
  const receivedRecipe = req.body;
  const { name, ingredients, preparation } = receivedRecipe;
  const { authorization: token } = req.headers;
  const { id: userId } = jwt.decode(token);
  const requiredFields = ['name', 'ingredients', 'preparation'];
  const doRequiredFieldsExist = fieldFinder(receivedRecipe, requiredFields);
  if (!doRequiredFieldsExist) {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }
  const { insertedId } = await createRecipe(name, ingredients, preparation, userId);

  return res.status(CREATED).json({ recipe: { name, ingredients, preparation, userId, _id: insertedId } });
});

RecipeController.get('/', async (req, res) => {
  const allRecipes = await getAllRecipes();

  return res.status(SUCCESS).json(allRecipes);
})

module.exports = RecipeController;
