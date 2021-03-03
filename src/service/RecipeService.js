// const { ObjectId } = require('mongodb');
const recipeModel = require('../model/Recipe');

// Return all Users
const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

// Return Recipe by ID
const findById = async (id) => {
  const recipe = await recipeModel.findById(id);
  return recipe;
};

// Add new Users
const create = async (name, ingredients, preparation, userId) => {
  const recipe = await recipeModel.create(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = {
  getAll,
  findById,
  create,
};
