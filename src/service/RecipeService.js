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

// Add new User
const create = async (name, ingredients, preparation, userId) => {
  const recipe = await recipeModel.create(name, ingredients, preparation, userId);
  
  return recipe;
};

// Update User
const update = async (recipe, name, ingredients, preparation) => {
  const updatedRecipe = await recipeModel.update(recipe, name, ingredients, preparation);
  
  return updatedRecipe;
};

// Remove Recipe
const remove = async (id) => {
  const removedRecipe = await recipeModel.remove(id);
  
  return removedRecipe;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
