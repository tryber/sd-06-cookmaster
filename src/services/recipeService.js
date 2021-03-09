const { ObjectId } = require('mongodb');
const recipeModel = require('../models/recipeModel');
const userService = require('./userService');
const usersModel = require('../models/usersModel');

const RECIPE_NOT_FOUND = 'recipe not found';

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

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(404).json({ message: RECIPE_NOT_FOUND });

  const exists = await recipeModel.getRecipeById(id);

  if (!exists) return res.status(404).json({ message: RECIPE_NOT_FOUND });

  res.status(200).json(exists);
};

const userAuthorized = async (id, email) => {
  const recipe = await recipeModel.getRecipeById(id);
  const { _id, role } = await usersModel.getUserByEmail(email);

  if (_id !== recipe.userId && role !== 'admin') return false;
  
  return true;
};

const updateRecipe = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(404).json({ message: RECIPE_NOT_FOUND });

  const userData = await userService.decodeToken(authorization);

  if (userAuthorized(id, userData.email)) {
    await recipeModel.updateRecipe(id, req.body);

    const recipeUpdated = await recipeModel.getRecipeById(id);

    res.status(200).json(recipeUpdated);
  }

  next();
};

const deleteRecipe = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(404).json({ message: RECIPE_NOT_FOUND });

  const userData = await userService.decodeToken(authorization);

  if (userAuthorized(id, userData.email)) {
    await recipeModel.deleteRecipe(id);

    res.status(204).send();
  }

  next();
};

module.exports = {
  createRecipe,
  verifyFields,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  userAuthorized,
  deleteRecipe,
};
