const services = require('../services/recipes');
const { CREATED, OK, NOT_FOUND } = require('../dictionary/StatusCode');
const { RECIPE_NOT_FOUND } = require('../dictionary/ErrorMessage');

const createNewRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { name: recipeName, ingredients, preparation } = req.body;

  const recipe = await services.createNewRecipe(recipeName, ingredients, preparation, userId);

  return res.status(CREATED).json({ recipe });
};

const getAllRecipes = async (req, res) => {
  const allRecipes = await services.getAllRecipes();

  return res.status(OK).json(allRecipes);
};

const getRecipeById = async (req, res) => {
  const { id: recipeId } = req.params;

  const recipe = await services.getRecipeById(recipeId);

  if (!recipe) return res.status(NOT_FOUND).json(RECIPE_NOT_FOUND);

  return res.status(OK).json(recipe);
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
};