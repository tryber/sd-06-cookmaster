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
  const errMessage = 'recipe not found';

  if (!ObjectId.isValid(id)) return { err: { code: 404, message: errMessage } };

  const recipeById = await recipes.getById(id);

  if (!recipeById) return { err: { code: 404, message: errMessage } };

  return recipeById;
};

const update = async (id, name, ingredients, preparation) => {
  const errorMessage = await dataValidate(name, ingredients, preparation);

  if (errorMessage) return errorMessage;

  const editRecipe = await recipes.update(id, name, ingredients, preparation);

  return editRecipe;
};

const exclude = async (id) => {
  const errMessage = 'recipe not found';

  if (!ObjectId.isValid(id)) return { err: { code: 404, message: errMessage } };

  const result = await recipes.exclude(id);

  if (!result) return { err: { code: 404, message: errMessage } };

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
