const express = require('express');
const { ObjectId } = require('mongodb');

const recipesRouter = express.Router();

const status200 = 200;
const status201 = 201;
const status204 = 204;

// import querys
const {
  createRecipes,
  getRecipeById,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
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
    return res.status(status200).json(recipes);
  });

recipesRouter.get('/:id', recipeExists,
  async (req, res) => {
    const { id } = req.params;
    const recipeDb = await getRecipeById(id);
    return res.status(status200).json(recipeDb);
  });

recipesRouter.put('/:id', tokenValid,
  async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const newRecipe = { id, name, ingredients, preparation, userId };
  await updateRecipe(newRecipe);
  return res.status(status200).json(newRecipe);
});

recipesRouter.delete('/:id', tokenValid,
  async (req, res) => {
    const { id } = req.params;
    await deleteRecipe(id);
    return res.status(status204).end();
});

recipesRouter.put('/:id/image', tokenValid,
  async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const recipe = await getRecipeById(id);
    const { name, ingredients, preparation } = recipe;
    const resJson = { _id: ObjectId(id), name, ingredients, preparation, userId, image: '' };
    return res.status(status200).json(resJson);
  });

module.exports = recipesRouter;
