const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, CREATED, SUCCESS, NOT_FOUND, UNATHORIZED } = require('../services/httpStatuses');
const { invalidEntries, recipeNotFound, notYours } = require('../services/messages');
const idValidator = require('../services/idValidator');
const { fieldFinder } = require('../services/validators');
const { createRecipe, getAllRecipes, getRecipeById, editRecipe } = require('../models/recipeModel');
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
});

RecipeController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const isIdValid = idValidator(id);
  if (!isIdValid) {
    return res.status(NOT_FOUND).json(recipeNotFound);
  }
  const recipe = await getRecipeById(id);

  return res.status(SUCCESS).json(recipe);
});

RecipeController.put('/:id', tokenVerifier, async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const receivedRecipe = req.body;
  const recipeToBeEdited = await getRecipeById(id);
  const { userId } = recipeToBeEdited;
  const { id: loggedUserId, role } = jwt.decode(token);

  if (loggedUserId !== userId && role !== 'admin') {
    return res.status(UNATHORIZED).json(notYours);
  }

  const requiredFields = ['name', 'ingredients', 'preparation'];
  const doRequiredFieldsExist = fieldFinder(receivedRecipe, requiredFields);

  if (!doRequiredFieldsExist) {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }
  const { name, ingredients, preparation } = receivedRecipe;
  
  await editRecipe(id, name, ingredients, preparation, userId);

  return res.status(SUCCESS).json({ _id: id, name, ingredients, preparation, userId });
});

module.exports = RecipeController;
