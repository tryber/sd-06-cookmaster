const recipes = require('../../models/recipes');

const messageError400 = 'Invalid entries. Try again.';
const messageError404 = 'recipe not found';
const messageError401 = 'missing auth token';

const createError = (message, status) => ({ message, status });

const createRecipeValidation = async (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return next(createError(messageError400, 400));
  }
    next();
};

const recipeByIdValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await recipes.getRecipeById(id);
    res.locals.recipe = recipe;
    next();
  } catch {
    return next(createError(messageError404, 404));
  }
};

const editRecipeValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return next(createError(messageError401, 401));
  }
  next();
};

module.exports = {
  createRecipeValidation,
  recipeByIdValidation,
  editRecipeValidation,
};