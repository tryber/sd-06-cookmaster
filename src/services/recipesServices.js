const { ObjectId } = require('mongodb');

const {
  createRecipe,
  searchRecipes,
  searchOne,
  updateRecipe,
  destroyRecipe,
  uploadImage,
} = require('../models/recipesModel');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INVALID_ENTRIES = 'Invalid entries. Try again.';
const RECIPE_NOT_FOUND = 'recipe not found';

const createNewRecipe = async (data) => createRecipe(data);
const searchAllRecipes = async () => searchRecipes();
const searchById = async (id) => searchOne(id);
const modifyRecipe = async (id, name, ingredients, preparation) =>
updateRecipe(id, name, ingredients, preparation);
const removeRecipe = async (id) => destroyRecipe(id);
const imagePath = async (id, image) => uploadImage(id, image);

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).json({
      message: INVALID_ENTRIES,
    });
  }

  next();
};

const checkId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).json({
    message: RECIPE_NOT_FOUND,
    });
  }

  next();
};

module.exports = {
  imagePath,
  createNewRecipe,
  removeRecipe,
  searchAllRecipes,
  searchById,
  modifyRecipe,
  validateRecipe,
  checkId,
};
