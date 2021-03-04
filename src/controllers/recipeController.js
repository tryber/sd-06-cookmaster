const { Router } = require('express');
const { badRequest, created, OK } = require('../utils/messages');
const validateToken = require('../auth/validateToken');
const service = require('../services/serviceRecipe');

const recipes = Router();

recipes.post('/', validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(badRequest).json({ message: 'Invalid entries. Try again.' });
  }
  const { _id: userId } = req.user;
  const recipe = await service.recipeCreate(name, ingredients, preparation, userId);
  return res.status(created).json(recipe);
});

recipes.get('/', async (_req, res) => {
  const getAllRecipes = await service.getAllRecipes();
  return res.status(OK).json(getAllRecipes);
});

module.exports = recipes;
