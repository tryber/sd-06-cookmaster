const RecipesModel = require('../models/RecipesModel');
const { throwThisError } = require('../utils/index');

const BAD_REQUEST = 400;
const CREATED = 201;

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

module.exports = {
  insertRecipe,
  verifyFields,
};