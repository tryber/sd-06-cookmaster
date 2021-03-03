const RecipesModel = require('../models/RecipesModel');
const { throwThisError } = require('../utils/index');

const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const CREATED = 201;
const OK = 200;

const verifyFields = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    throwThisError(BAD_REQUEST, 'Invalid entries. Try again.');
  }
  next();
};

const insertRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  let recipeId;
  try {
    recipeId = await RecipesModel.insertRecipe({ name, ingredients, preparation, userId });
  } catch {
    throwThisError(500, 'Internal Error');
  }
  const recipe = { _id: recipeId, name, ingredients, preparation, userId }; 
  res.status(CREATED).json({ recipe });
};

const getAll = async (req, res) => {
  const allRecipes = await RecipesModel.getAll();
  res.status(OK).json(allRecipes);
};

const findById = async (req, res) => {
  const { id } = req.params;
  let recipe;
  try {
    recipe = await RecipesModel.findById(id);
    if (!recipe) throwThisError(NOT_FOUND, 'recipe not found');
  } catch {
    throwThisError(NOT_FOUND, 'recipe not found');
  }
  return res.status(OK).json(recipe);
};

module.exports = {
  insertRecipe,
  verifyFields,
  getAll,
  findById,
};