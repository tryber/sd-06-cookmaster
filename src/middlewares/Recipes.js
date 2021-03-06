const { validateRecipe, validateRecipeId } = require('../schemas/Recipes');
const Recipes = require('../services/Recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const newRecipe = await Recipes.createRecipe(name, ingredients, preparation, _id);
  res.status(201).json(newRecipe);
};

const getAllRecipes = async (req, res) => {
  const recipes = await Recipes.getAllRecipes();
  res.status(200).json(recipes);
};

const recipeValidation = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const validations = await validateRecipe(name, ingredients, preparation);

  if (validations.message) {
    return next({
        statusCode: validations.code,
        customMessage: validations.message,
    }); 
  }

  next();
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (recipe.customMessage) return next(recipe);
  
  res.status(200).json(recipe);
};

const updateRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipe = await Recipes.getRecipeById(id);
  if (recipe.customMessage) return next(recipe);

  if (String(recipe.userId) !== String(userId) && role !== 'admin') {
    return next({ statusCode: 401, customMessage: 'invalid user or role' });
  }

  const updatedRecipe = await Recipes.updateRecipe({ name, ingredients, preparation, id, userId });
  
  res.status(200).json(updatedRecipe);
};

const idValidation = (req, _res, next) => {
  const { id } = req.params;
  const validation = validateRecipeId(id);

  if (validation.customMessage) return next(validation);

  next();
};

module.exports = {
  createRecipe,
  getAllRecipes,
  recipeValidation,
  idValidation,
  getRecipeById,
  updateRecipe,
};