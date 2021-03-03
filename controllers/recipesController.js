const { Router } = require('express');
const { ObjectId } = require('mongodb');
const validateJWT = require('../utils/validateJWT');
const service = require('../services/recipesService');

const recipes = Router();

const MESSAGE_ERROR_NOT_FOUND = {
  message: 'recipe not found', 
};

recipes.post('/', validateJWT, async (request, response) => {
  const { name, ingredients, preparation } = request.body;

  if (!name || !ingredients || !preparation) {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const { _id: userId } = request.user;

  const recipe = await service.createRecipe(name, ingredients, preparation, userId);

  return response.status(201).json(recipe);
});

// Requisito 04
recipes.get('/', async (_request, response) => {
  const allRecipes = await service.getAllRecipes();
  return response.status(200).json(allRecipes);
});

// Requisito 05
recipes.get('/:id', async (request, response) => {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) return response.status(404).json(MESSAGE_ERROR_NOT_FOUND);

  const recipe = await service.getRecipeById(id);

  if (!recipe) return response.status(404).json(MESSAGE_ERROR_NOT_FOUND);

  return response.status(200).json(recipe);
});

// Requisito 07
recipes.put('/:id', validateJWT, async (request, response) => {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) return response.status(404).json(MESSAGE_ERROR_NOT_FOUND);

  const { _id: userId } = request.user;

  const { name, ingredients, preparation } = request.body;
  
  const payload = { 
    name, 
    ingredients, 
    preparation, 
  };

  const editedRecipe = await service.editRecipeById(id, payload, userId);

  return response.status(200).json(editedRecipe);
});

// Requisito 08
recipes.delete('/:id', validateJWT, async (request, response) => {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) return response.status(404).json(MESSAGE_ERROR_NOT_FOUND);

  await service.removeRecipeById(id);

  return response.status(204).json({ message: 'deleted' });
});

module.exports = recipes;