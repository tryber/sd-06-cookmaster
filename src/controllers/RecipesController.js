const rescue = require('express-rescue');
const { RecipesController } = require('.');
const { RecipesService } = require('../services');

const SUCCESS = 200;
const CREATED = 201;

const registerNewRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await RecipesService.registerNewRecipe(name, ingredients, preparation);

  res
    .status(CREATED)
    .json(newRecipe);
});

const listAllRecipes = rescue(async (_req, res) => {
  const allRecipes = await RecipesService.listAllRecipes();

  return res
    .status(SUCCESS)
    .json(allRecipes);
});

module.exports = {
  registerNewRecipe,
  listAllRecipes,
};
