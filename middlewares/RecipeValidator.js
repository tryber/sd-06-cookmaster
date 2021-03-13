const { ObjectId } = require('mongodb');
const { RecipesModel } = require('../models');

const status400 = 400;
const status404 = 404;
const errorMsg = (status, mess) => ({ status, message: { message: mess } });

const RecipeValidator = async (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return next(errorMsg(status400, 'Invalid entries. Try again.'));
  }
  next();
};

const GetByIdValidator = async (req, _res, next) => {
  const { id } = req.params;
  const recipe = ObjectId.isValid(id) && await RecipesModel.getById(id);
  if (!recipe) return next(errorMsg(status404, 'recipe not found'));
  req.infoRecipe = recipe;
  next();
};

module.exports = {
  RecipeValidator,
  GetByIdValidator,
};