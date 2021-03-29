const express = require('express');

const recipesRouter = express.Router();

const status201 = 201;
const status200 = 200;

// import querys
const {
  createRecipes,
  getRecipeById,
  getAllRecipes,
} = require('../models/queryRecipes');
// -------------------------------------------
// import midllewares
const {
  nameExists,
  ingredientsExists,
  preparationExists,
  recipeExists,
} = require('../services/midllewaresRecipes');
const {
  tokenValid,
} = require('../services/authToken');
// -------------------------------------------

recipesRouter.post('/', nameExists, ingredientsExists, preparationExists, tokenValid,
  async (req, res) => {
    const { userId } = req;
    const { name, ingredients, preparation } = req.body;
    const { insertedId } = await createRecipes(name, ingredients, preparation, userId);
  try {
  return res.status(status201).json(
    { recipe: { name, ingredients, preparation, userId, _id: insertedId } },
  ); 
} catch (error) {
    console.log(error);
  }
});

recipesRouter.get('/',
  async (_req, res) => {
    const recipes = await getAllRecipes();
    res.status(status200).json(recipes);
  });

recipesRouter.get('/:id', recipeExists,
  async (req, res) => {
    const { id } = req.params;
    const recipeDb = await getRecipeById(id);
    res.status(status200).json(recipeDb);
  });

module.exports = recipesRouter;
