const { ObjectId } = require('mongodb');
const { badRequest, created, OK, notFound } = require('../utils/messages');
const service = require('../services/serviceRecipe');

// arquivo para usar sem o ROUTE

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(badRequest).json({ message: 'Invalid entries. Try again.' });
  }
  const { _id: userId } = req.user;
  const recipe = await service.recipeCreate(name, ingredients, preparation, userId);
  return res.status(created).json(recipe);
};

const getAllRecipes = async (_req, res) => {
  const allRecipes = await service.getAllRecipes();
  return res.status(OK).json(allRecipes);
};

// https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(notFound).json({ message: 'recipe not found' });
  const recipe = await service.getRecipeById(id);
  if (!recipe) return res.status(notFound).json({ message: 'recipe not found' });
  return res.status(OK).json(recipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
