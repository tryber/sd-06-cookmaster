const services = require('../services/recipeService');
const { CREATED, OK, NOT_FOUND, UNAUTHORIZED, NO_CONTENT } = require('../errors/statusCode');
const { RECIPE_NOT_FOUND, NO_AUTH_TOKEN } = require('../errors/messageError');

const createNewRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { name: recipeName, ingredients, preparation } = req.body;
  const recipe = await services.createNewRecipe(recipeName, ingredients, preparation, userId);

  return res.status(CREATED).json({ recipe });
};

const getAllRecipes = async (_req, res) => {
  const allRecipes = await services.getAllRecipes();

  return res.status(OK).json(allRecipes);
};

const getRecipeById = async (req, res) => {
  const { id: recipeId } = req.params;
  const recipe = await services.getRecipeById(recipeId);

  if (!recipe) return res.status(NOT_FOUND).json(RECIPE_NOT_FOUND);

  return res.status(OK).json(recipe);
};

const editRecipe = async (req, res) => {
  const { _id: userId, role } = req.user;
  const { id: recipeId } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipeToEdit = await services.getRecipeById(recipeId);

  if (!recipeToEdit.userId.equals(userId) && role !== 'admin') {
    return res.status(UNAUTHORIZED).json(NO_AUTH_TOKEN);
  }

  const result = await services.editRecipe(recipeId, name, ingredients, preparation);

  return res.status(OK).json(result.value);
};

const deleteRecipe = async (req, res) => {
  const { _id: userId, role } = req.user;
  const { id: recipeId } = req.params;
  const recipeToDelete = await services.getRecipeById(recipeId);

  if (!recipeToDelete.userId.equals(userId) && role !== 'admin') {
    return res.status(UNAUTHORIZED).json(NO_AUTH_TOKEN);
  }

  await services.deleteRecipe(recipeId);

  return res.status(NO_CONTENT).json();
};

const uploadFile = async (req, res) => {
  const { id: recipeId } = req.params;
  const { host } = req.headers;
  const imageFilePath = `${host}/images/${recipeId}.jpeg`;
  const recipe = await services.getRecipeById(recipeId);
    
  return res.status(OK).json({ ...recipe, image: imageFilePath });
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  uploadFile,
};