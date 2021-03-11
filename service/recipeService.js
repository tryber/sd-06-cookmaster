const { ObjectId } = require('mongodb');

const {
  createRecipe,
  findAllRecipes,
  findOneRecipe,
  editRecipe,
  deleteRecipe,
} = require('../models/recipeModel');

const createNewRecipe = async (data) => createRecipe(data);

const getAllRecipes = async () => findAllRecipes();
const getRecipeById = async (id) => findOneRecipe(id);

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
    message: 'recipe not found',
    });
  }

  next();
};

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const putRecipe = async (id, name, ingredients, preparation) => {
  editRecipe(id, name, ingredients, preparation);
};

const delRecipe = async (id) => deleteRecipe(id);

module.exports = {
  createNewRecipe,
  validateRecipe,
  getAllRecipes,
  getRecipeById,
  validateId,
  putRecipe,
  delRecipe,
};
