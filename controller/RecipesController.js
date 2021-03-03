const express = require('express');
const RecipesModel = require('../models/RecipesModel');
const { validateRecipe } = require('../middlewares/validateRecipe');
const { validadeToken } = require('../middlewares/validateToken');

const recipesRouter = express.Router();

recipesRouter.post('/', validadeToken, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { insertedId } = await RecipesModel.create(name, ingredients, preparation);

  const newRecipe = { recipe: { _id: insertedId, name, ingredients, preparation } };

  res.status(201).json(newRecipe);
});

module.exports = recipesRouter;