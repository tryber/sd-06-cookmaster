const { ObjectId } = require('mongodb');
const {
  addImage,
  createRecipe,
  editRecipe,
  deleteRecipe,
  findAllRecipes,
  findOneRecipe,
} = require('../Models/recipesModel');

const BadRequestCode = 400;
const NotFoundCode = 404;

const createNewRecipe = async (data) => createRecipe(data);
const getAllRecipes = async () => findAllRecipes();
const getRecipeById = async (id) => findOneRecipe(id);

const putRecipe = async (id, name, ingr, prep) => editRecipe(id, name, ingr, prep);
const excludeRecipe = async (id) => deleteRecipe(id);
const fetchImage = async (id, image) => addImage(id, image);

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
  fetchImage,
  excludeRecipe,
  getAllRecipes,
  getRecipeById,
  putRecipe,
  validateRecipe,
  validateId,
};
