const { ObjectId } = require('mongodb');
const {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
} = require('../models/recipes');

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const createNewRecipe = async (data) => createRecipes(data);

const findAllRecipes = async () => getAllRecipes();
const findOneRecipe = async (id) => getRecipeById(id);

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
    message: 'recipe not found',
    });
  }
  next();
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  editRecipeById(id, name, ingredients, preparation);
};

const delRecipe = async (id) => deleteRecipe(id);

module.exports = {
  validateRecipe,
  createNewRecipe,
  findAllRecipes,
  findOneRecipe,
  validateId,
  updateRecipe,
  delRecipe,
};
