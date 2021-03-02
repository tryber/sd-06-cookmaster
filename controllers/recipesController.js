const services = require('../services/recipesServices');

const { OK, CREATED, NO_CONTENT } = require('../utils/statusCode');

const createRecipes = async (req, res, next) => {
  try {
    const newRecipe = req.body;
    const email = req.user;
    const recipeCreated = await services.createRecipe(email, newRecipe);

    res.status(CREATED).json({ recipe: recipeCreated });
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

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = req.body;
    const recipeById = await services.updateRecipe(id, recipe);

    res.status(OK).json(recipeById);
  } catch (err) {
    next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    await services.deleteRecipe(id);
    res.status(NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
