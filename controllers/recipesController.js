const { Router } = require('express');
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

module.exports = recipes;