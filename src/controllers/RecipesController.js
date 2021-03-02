const Boom = require('@hapi/boom');
const rescue = require('express-rescue');
const { RecipesService } = require('../services');

const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;

const registerNewRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await RecipesService.registerNewRecipe(name, ingredients, preparation);

  return res
    .status(CREATED)
    .json(newRecipe);
});

const listAllRecipes = rescue(async (_req, res) => {
  const allRecipes = await RecipesService.listAllRecipes();

  return res
    .status(SUCCESS)
    .json(allRecipes);
});

const listRecipeById = rescue(async (req, res) => {
  const { id } = req.params;

  const recipeById = await RecipesService.listRecipeById(id);

  if (recipeById.error) {
    throw Boom.notFound(recipeById.message);
  }

  return res
    .status(SUCCESS)
    .json(recipeById);
});

const editRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const recipeEdited = await RecipesService.editRecipe(id, name, ingredients, preparation);

  return res
    .status(SUCCESS)
    .json(recipeEdited);
});

const deleteRecipe = rescue(async (req, res) => {
  const { id } = req.params;

  return res
    .status(NO_CONTENT)
    .json(await RecipesService.deleteRecipe(id));
});

module.exports = {
  registerNewRecipe,
  listAllRecipes,
  listRecipeById,
  editRecipe,
  deleteRecipe,
};
