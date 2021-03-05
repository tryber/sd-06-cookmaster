const Model = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) throw Error('Invalid entries. Try again.');

  const recipe = await Model.createRecipe(name, ingredients, preparation);
  return recipe;
};

module.exports = {
  createRecipe,
};
