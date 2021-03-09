const { ObjectId } = require('mongodb');
const recipeModel = require('../models/recipeModel');
const { ThrowError, sendError } = require('./handleErrors');

const createRecipe = async (recipe) => {
  const createdRecipe = recipeModel.createRecipe(recipe);

  return createdRecipe;
};

const verifyFields = async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;

  if (!name || !ingredients || !preparation) {
    return response.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const getAllRecipes = async () => {
  const allRecipes = await recipeModel.getAllRecipes();

  return allRecipes;
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(404).json({ message: 'recipe not found' });

  const exists = await recipeModel.getRecipeById(id);

  if (!exists) return res.status(404).json({ message: 'recipe not found' });

  res.status(200).json(exists);

  next();
};

module.exports = {
  createRecipe,
  verifyFields,
  getAllRecipes,
  getRecipeById,
};
