const { status } = require('../middlewares/errorHandler/dictionaries');
const recipesServices = require('../services/recipesServices');

const registerRecipe = async (req, res) => {
  const requestPayload = {
    body: { ...req.body },
    user: { ...req.user },
  };
  const responsePayload = await recipesServices.registerRecipe(requestPayload);
  res.status(status.created).json(responsePayload);
};

const getAllRecipes = async (req, res) => {
  const responsePayload = await recipesServices.getAllRecipes();
  res.status(status.ok).json(responsePayload);
};

const getRecipesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const responsePayload = await recipesServices.getRecipesById(id);
    res.status(status.ok).json(responsePayload);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { user, body } = req;
  const requestPayload = {
    id,
    user,
    body,
  };
  const responsePayload = await recipesServices.updateRecipe(requestPayload);
  res.status(status.ok).json(responsePayload);
};

const deleteRecipeById = async (req, res) => {
  const { id } = req.params;
  await recipesServices.deleteRecipeById(id);
  res.status(status.noContent).send('');
};

const addImageToRecipe = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { filename } = req.file;
  const requestPayload = {
    id,
    filename,
    user,
  };
  const responsePayload = await recipesServices.addImageToRecipe(requestPayload);
  res.status(status.ok).json(responsePayload);
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipesById,
  deleteRecipeById,
  addImageToRecipe,
  updateRecipe,
};