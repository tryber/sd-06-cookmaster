const RecipesService = require('../service/RecipesService');

const SUCCESS = 200;
const SUCCESS_201 = 201;

const getAllRecipes = async (_req, res) => {
  const result = await RecipesService.getAllRecipes();

  return res.status(SUCCESS).json(result);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params; 
  const result = await RecipesService.getRecipeById(id);
  if (result.payload) return next(result);

  return res.status(SUCCESS).json(result);
};

const createRecipe = async (req, res, next) => {
  const { authorization } = req.headers;
  const { name, ingredients, preparation } = req.body;
  
  const result = await RecipesService.createRecipe(name, ingredients, preparation, authorization);

  if (result.payload) return next(result);
  return res.status(SUCCESS_201).json(result);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
