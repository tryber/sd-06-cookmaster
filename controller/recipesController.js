const { Router } = require('express');
const rescue = require('express-rescue');
// const multer = require('multer');
const validateJWT = require('../auth/validate');
const recipesModels = require('../models');
const recipesServices = require('../services');

const STATUS200 = 200;
const STATUS201 = 201;
const STATUS400 = 400;
const STATUS404 = 404;

const recipes = Router();

recipes.post('/', validateJWT, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  if (!name || !ingredients || !preparation) {
    return res.status(STATUS400).json({ message: 'Invalid entries. Try again.' });
  }
  const recipe = await recipesModels.recipes.register(name, ingredients, preparation, userId);
  return res.status(STATUS201).json(recipe);
}));

recipes.get('/', rescue(async (_req, res) => {
  const allRecipes = await recipesModels.recipes.getAllRecipes();
  return res.status(STATUS200).json(allRecipes);
}));

recipes.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.recipes.getRecipeById(id);
  if (!recipe) {
    return res.status(STATUS404).json({ message: 'recipe not found' });
  }
  return res.status(STATUS200).json(recipe);
}));

module.exports = recipes;
