/* eslint-disable no-restricted-globals */
const model = require('../models/modelRecipes');

const getAllRecipes = async () => model.getAllRecipes();

const getRecipeById = async (id) => {
  const recipe = await model.getRecipeById(id);

  return recipe;
};

const createRecipe = async ({ name, ingredients, preparation }) => {
  const newRecipe = await model.createRecipe({ name, ingredients, preparation });

  return newRecipe;
};

const updateRecipe = async ({ id, ingredients, preparation }) => {
  const update = await model.updateRecipe({ name, id, ingredients, preparation });

  return update;
};

const excludeRecipe = async (id) => {
  const exclude = await model.excludeRecipe(id);

  return exclude;
};

module.exports = {
  excludeRecipe,
  updateRecipe,
  createRecipe,
  getRecipeById,
  getAllRecipes,
};