const Recipe = require('../models/Recipe');

async function create(name, ingredients, preparation, userId) {
  const registeredRecipe = await Recipe.create(name, ingredients, preparation, userId);
  return registeredRecipe;
}

module.exports = {
  create,
};
