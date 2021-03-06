const Recipe = require('../models/Recipe');

const NOT_FOUND = 404;

async function create(name, ingredients, preparation, userId) {
  const registeredRecipe = await Recipe.create(name, ingredients, preparation, userId);
  return registeredRecipe;
}

async function getAll() {
  const recipes = await Recipe.getAll();
  return recipes;
}

async function findById(id) {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return {
      error: {
        code: NOT_FOUND,
        message: 'recipe not found',
      },
    };
  }

  return recipe;
}

async function update(newDataFromRecipe) {
  const updatedRecipe = await Recipe.update(newDataFromRecipe);
  if (!updatedRecipe) {
    return {
      error: {
        message: 'Recipe not updated',
        code: NOT_FOUND,
      },
    };
  }

  return updatedRecipe;
}

module.exports = {
  create,
  getAll,
  findById,
  update,
};
