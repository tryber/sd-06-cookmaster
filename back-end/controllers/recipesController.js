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

const deleteRecipeById = async (req, res) => {
  const responsePayload = recipesServices.deleteRecipeById();
  console.log(responsePayload);
  res.status(status.ok).send('Delete recipes by id');
};

const addImageToRecipe = async (req, res) => {
  const responsePayload = recipesServices.addImageToRecipe();
  console.log(responsePayload);
  res.status(status.ok).send('Add image to Recipe');
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipesById,
  deleteRecipeById,
  addImageToRecipe,
};