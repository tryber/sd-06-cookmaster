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

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (recipe.customMessage) return next(recipe);
  
  res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;

  const updatedRecipe = await Recipes.updateRecipe({ name, ingredients, preparation, id, userId });
  
  res.status(200).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  await Recipes.removeRecipe(id);
  
  res.status(204).send();
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};