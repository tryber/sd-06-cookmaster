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

module.exports = {
  create,
  getAll,
  findById,
};
