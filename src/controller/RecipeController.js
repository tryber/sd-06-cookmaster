const { Router } = require('express');
const service = require('../service/RecipeService');
const { validateUserToken } = require('../middlewares/TokenMiddleware'); 
const { validateRecipe } = require('../middlewares/RecipeMiddleware');

const RecipeController = new Router();
const OK = 200;
const CREATED = 201;

// Get All Recipes
RecipeController.get('/', validateUserToken, async (req, res) => {
  const recipes = await service.getAll();
  res.status(OK).json({ recipes });
});

// Create New Recipe
RecipeController.post('/', validateUserToken, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const recipe = await service.create(name, ingredients, preparation, userId);

  res.status(CREATED).json(recipe);
});

module.exports = RecipeController;
