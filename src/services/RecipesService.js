const RecipesModel = require('../models/RecipesModel');
const { throwThisError } = require('../utils/index');

const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;

const verifyFields = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    throwThisError(BAD_REQUEST, 'Invalid entries. Try again.');
  }
  next();
};

const insertRecipe = async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
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

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const recipe = await RecipesModel.updateRecipe(id, { name, ingredients, preparation });
  res.status(OK).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    await RecipesModel.deleteRecipe(id);
  } catch (error) {
    throwThisError(500, error.message);
  }

  res.status(NO_CONTENT).send();
};

const insertImageInfo = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const imagePath = `${req.headers.host}/images/${filename}`;

  const recipe = await RecipesModel.updateImageRecipe(id, imagePath);
  
  res.status(200).send(recipe);
};

module.exports = {
  insertRecipe,
  verifyFields,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  insertImageInfo,
};