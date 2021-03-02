const model = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await model.createRecipe(name, ingredients, preparation, userId);
  return newRecipe;
};

module.exports = {
  createRecipe,
};