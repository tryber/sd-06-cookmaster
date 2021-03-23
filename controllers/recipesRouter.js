const express = require('express');

const recipesRouter = express.Router();

const status201 = 201;

// import querys
const {
  createRecipe,
} = require('../models/queryRecipes');
// -------------------------------------------
// import midllewares
const {
  nameExists,
  ingredientsExists,
  preparationExists,
} = require('../services/midllewaresRecipes');
// -------------------------------------------

recipesRouter.post('/', nameExists, ingredientsExists, preparationExists, async (req, res) => {
  const recipe = req.body;
  const { name, ingredients, preparation } = req.body;
  const { insertedId } = await createRecipe(recipe);
  return res.status(status201).json(
    { recipe: { name, ingredients, preparation, userId: '?', _id: insertedId } },
  );
});

module.exports = recipesRouter;
