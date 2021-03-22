const { ObjectId } = require('mongodb');
const {
  createRecipe,
  findAllRecipes,
  findOneRecipe,
  editRecipe,
} = require('../Models/recipesModel');

const BadRequestCode = 400;
const NotFoundCode = 404;

const createNewRecipe = async (data) => createRecipe(data);
const getAllRecipes = async () => findAllRecipes();
const getRecipeById = async (id) => findOneRecipe(id);

const putRecipe = async (id, name, ingredients, preparation) => {
  editRecipe(id, name, ingredients, preparation);
};

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(BadRequestCode).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(NotFoundCode).json({
    message: 'recipe not found',
    });
  }
  next();
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  putRecipe,
  validateRecipe,
  validateId,
};
