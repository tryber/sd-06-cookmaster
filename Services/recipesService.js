const { ObjectId } = require('mongodb');

const {
  createRecipe,
  findAllRecipes,
  findOneRecipe,
  editRecipe,
  deleteRecipe,
  addImage,
} = require('../Model/recipesModel');

const fourHundred = 400;
const fourHundredFour = 404;

const createNewRecipe = async (data) => createRecipe(data);
const getAllRecipes = async () => findAllRecipes();
const getRecipeById = async (id) => findOneRecipe(id);
const putRecipe = async (id, name, ingr, prep) => editRecipe(id, name, ingr, prep);
const delRecipe = async (id) => deleteRecipe(id);
const addImagePath = async (id, image) => addImage(id, image);

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(fourHundred).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(fourHundredFour).json({
    message: 'recipe not found',
    });
  }

  next();
};

module.exports = {
  addImagePath,
  createNewRecipe,
  delRecipe,
  getAllRecipes,
  getRecipeById,
  putRecipe,
  validateRecipe,
  validateId,
};
