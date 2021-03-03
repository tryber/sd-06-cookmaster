// const { ObjectId } = require('mongodb');
const recipeModel = require('../model/Recipe');

// Return all Users
const getAll = async () => {
  const users = await recipeModel.getAll();
  return users;
};

// Add new Users
const create = async (name, ingredients, preparation, userId) => {
  const user = await recipeModel.create(name, ingredients, preparation, userId);
  return user;
};

module.exports = {
  getAll,
  create,
};
