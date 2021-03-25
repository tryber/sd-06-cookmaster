const express = require('express');

const recipesRouter = express.Router();

const status201 = 201;

// import querys
const {
  createRecipes,
} = require('../models/queryRecipes');
// -------------------------------------------
// import midllewares
const {
  nameExists,
  ingredientsExists,
  preparationExists,
  tokenExistis,
} = require('../services/midllewaresRecipes');
// -------------------------------------------

recipesRouter.post('/', nameExists, ingredientsExists, preparationExists, tokenExistis,
  async (req, res) => {
  try {
  const recipe = req.body;
  const { name, ingredients, preparation } = req.body;
  const { insertedId } = await createRecipes(recipe);
  return res.status(status201).json(
    { recipe: { name, ingredients, preparation, userId: '?', _id: insertedId } },
  ); 
} catch (error) {
    console.log(error);
  }
});

module.exports = recipesRouter;
