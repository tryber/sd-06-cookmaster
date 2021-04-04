const recipesService = require('./recipesService');
const recipesModel = require('./recipesModel');

const createRecipe = async (req, res) => {
  console.log('RECIPES CONTROLLER');

  const { userId } = req;
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

module.exports = {
  createRecipe,
  getAllRecipes,
  findById,
};
