const express = require('express');
const RecipesModel = require('../models/RecipesModel');
const { validateRecipe, validateRecipeId } = require('../middlewares/validateRecipe');
const { validadeToken, validadeTokenPut } = require('../middlewares/validateToken');

const recipesRouter = express.Router();

recipesRouter.get('/', async (_req, res) => {
  const allRecipes = await RecipesModel.getAll();
  res.status(200).json(allRecipes);
});

recipesRouter.get('/:id', validateRecipeId, async (req, res) => {
  const { id } = req.params;
  const recipeId = await RecipesModel.getById(id);

  res.status(200).json(recipeId);
});

recipesRouter.post('/', validadeToken, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { insertedId } = await RecipesModel.create(name, ingredients, preparation);

  const newRecipe = { recipe: { _id: insertedId, name, ingredients, preparation } };

  res.status(201).json(newRecipe);
});

recipesRouter.put('/:id', validadeTokenPut, validadeToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const updated = await RecipesModel.update(name, ingredients, preparation, id);

  // const newRecipe = { recipe: { _id: insertedId, name, ingredients, preparation } };

  res.status(200).json(updated);
});

module.exports = recipesRouter;