const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, CREATED, SUCCESS,
  NOT_FOUND, UNATHORIZED, NO_CONTENT } = require('../services/httpStatuses');
const { invalidEntries, recipeNotFound, notYours } = require('../services/messages');
const idValidator = require('../services/idValidator');
const { fieldFinder } = require('../services/validators');
const { createRecipe, getAllRecipes,
  getRecipeById, editRecipe, deleteRecipe } = require('../models/recipeModel');
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

  return res.status(CREATED).json({ recipe: {
    name, ingredients, preparation, userId, _id: insertedId,
  } });
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
  const { authorization: token } = req.headers;
  const recipeToBeEdited = await getRecipeById(req.params.id);
  const { id: loggedUserId, role } = jwt.decode(token);
  if (loggedUserId !== recipeToBeEdited.userId && role !== 'admin') {
    return res.status(UNATHORIZED).json(notYours);
  }
  const requiredFields = ['name', 'ingredients', 'preparation'];
  const doRequiredFieldsExist = fieldFinder(req.body, requiredFields);

  if (!doRequiredFieldsExist) {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }
  
  await editRecipe(req.params.id, req.body, recipeToBeEdited.userId);

  return res.status(SUCCESS).json(
    { _id: req.params.id, ...req.body, userId: recipeToBeEdited.userId },
  );
});

RecipeController.delete('/:id', tokenVerifier, async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const recipeToBeEdited = await getRecipeById(id);
  const { userId } = recipeToBeEdited;
  
  const { id: loggedUserId, role } = jwt.decode(token);
  if (loggedUserId !== userId && role !== 'admin') {
    return res.status(UNATHORIZED).json(notYours);
  }
  await deleteRecipe(id);

  return res.status(NO_CONTENT).send();
});

module.exports = RecipeController;
