const RecipeModel = require('../models/recipe');

const addRec = async (name, ingredients, preparation) => {
  const result = await RecipeModel.addRecipe(name, ingredients, preparation);
  return result;
};

module.exports = {
  addRec,
};
