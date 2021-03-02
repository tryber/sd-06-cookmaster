const { ObjectId } = require('mongodb');
const recipes = require('../models/recipes');

const dataValidate = async (name, ingredients, preparation) => {
  const errMessage = 'Invalid entries. Try again.';

  if (!name || !ingredients || !preparation) return { err: { status: 400, message: errMessage } };

  return false;
};

const create = async (name, ingredients, preparation, userId) => {
  const errorMessage = await dataValidate(name, ingredients, preparation);

  if (errorMessage) return errorMessage;

  const recipeCreated = await recipes.create(name, ingredients, preparation, userId);

  return recipeCreated;
};

const getAll = async () => {
  const result = await recipes.getAll();

  return result;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return { err: { code: 404, message: 'recipe not found' } };

  const recipeById = await recipes.getById(id);

  if (!recipeById) return { err: { code: 404, message: 'recipe not found' } };

  return recipeById;
};

module.exports = {
  create,
  getAll,
  getById,
};
