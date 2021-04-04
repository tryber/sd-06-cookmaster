const recipesService = require('./recipesService');
const recipesModel = require('./recipesModel');

const createRecipe = async (req, res) => {
  console.log('RECIPES CONTROLLER');

  const { userId } = req;
  console.log('USER ID NO RECIPES CONTROLLER', userId);
  console.log('TESTE req', userId);
  const { name, ingredients, preparation } = req.body;

  const newRecipe = {
    userId,
    name,
    ingredients,
    preparation,
  };

  const { createdRecipe, message } = await recipesService.createRecipe(newRecipe);
  if (message) return res.status(400).json({ message });

  res.status(201).json(createdRecipe);
};

const getAllRecipes = async (req, res) => {
  console.log('GET ALL RECIPES');

  const recipes = await recipesModel.getAllRecipes();

  return res.status(200).json(recipes);
};

const findById = async (req, res) => {
  console.log('FIND BY IS CONTROLLER');

  const { id } = req.params;

  const { recipeById, message } = await recipesService.findById(id);

  if (message) return res.status(404).json({ message });

  res.status(200).json(recipeById);
};

const updateRecipe = async (req, res) => {
  console.log('UPDATE RECIPE CONTROLLER');
  const recipeId = req.params.id;
  const { name, ingredients, preparation } = req.body;
  const editedRecipe = {
    recipeId,
    name,
    ingredients,
    preparation,
  };

  const { recipe, message } = await recipesService.updateRecipe(editedRecipe);
  // console.log('RECIPE EDITED', recipe);

  if (message) return res.status(404).json({ message });

  res.status(200).json(recipe);
};

const removeRecipe = async (req, res) => {
  console.log('DELETE RECIPE CONROLLER');

  const { id } = req.params;

  const result = await recipesModel.removeRecipe(id);
  res.status(204).json(result);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findById,
  updateRecipe,
  removeRecipe,
};
