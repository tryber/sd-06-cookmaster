const { Router } = require('express');
const { ObjectId } = require('mongodb');
const validateJWT = require('../utils/validateJWT');
const service = require('../services/recipesService');

const recipes = Router();

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

  if (!ObjectId.isValid(id)) return response.status(404).json({ message: 'recipe not found' });
  
  const recipe = await service.getRecipeById(id);

  if (!recipe) return response.status(404).json({ message: 'recipe not found' });

  return response.status(200).json(recipe);
});

module.exports = recipes;