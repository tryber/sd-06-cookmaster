const Recipes = require('../models/Recipes');

const create = async (name, ingredients, preparation, _id) =>
  Recipes.createNewRecipe(name, ingredients, preparation, _id);

module.exports = {
  create,
};
