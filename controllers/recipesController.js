const services = require('../services/recipesServices');

const { OK } = require('../utils/statusCode');

const createRecipes = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const newRecipe = req.body;
    const recipeCreated = await services.createRecipe(token, newRecipe);

    res.status(201).json({ recipe: recipeCreated });
  } catch (err) {
    next(err);
  }
};

const getAllRecipes = async (_req, res) => {
  const allRecipes = await services.getAllRecipes();
  res.status(OK).json(allRecipes);
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeById = await services.getRecipeById(id);

    res.status(OK).json(recipeById);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};
