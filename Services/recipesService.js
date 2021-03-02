const { ObjectId } = require('mongodb');
const { 
  createRecipes,
  findAllRecipes,
  findOneRecipes,
  editRecipes,
  deleteRecipes,
} = require('../Model/recipeModel');

const createNewRecipe = async (data) => createRecipes(data);
const getAllRecipes = async () => findAllRecipes();
const getRecipesById = async (id) => findOneRecipes(id);
const putRecipe = async (id, name, ingr, prep) => editRecipes(id, name, ingr, prep);
const delRecipe = async (id) => deleteRecipes(id);

const BAD_REQUEST = 400;

const validateRecipes = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const NOT_FOUND = 404;

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).json({
      message: 'recipe not found',
    });
  }
  next();
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipesById,
  putRecipe,
  delRecipe,
  validateRecipes,
  validateId,
};
