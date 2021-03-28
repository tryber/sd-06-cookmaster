const express = require('express');

const recipesRouter = express.Router();

const status201 = 201;
const status200 = 200;

// import querys
const {
  createRecipes,
  getRecipes,
} = require('../models/queryRecipes');
// -------------------------------------------
// import midllewares
const {
  nameExists,
  ingredientsExists,
  preparationExists,
} = require('../services/midllewaresRecipes');
const {
  tokenValid,
} = require('../services/authToken');
// -------------------------------------------

recipesRouter.post('/', nameExists, ingredientsExists, preparationExists, tokenValid,
  async (req, res) => {
    const recipe = req.body;
    const { name, ingredients, preparation } = req.body;
    const { insertedId } = await createRecipes(recipe);
  try {
  return res.status(status201).json(
    { recipe: { name, ingredients, preparation, userId: '?', _id: insertedId } },
  ); 
} catch (error) {
    console.log(error);
  }
});

recipesRouter.get('/',
  async (_req, res) => {
    const recipes = await getRecipes();
    res.status(status200).json(recipes);
  });

module.exports = recipesRouter;
