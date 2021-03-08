const Recipes = require('../models/Recipes');

const create = async (name, ingredients, preparation, _id) =>
  Recipes.createNewRecipe(name, ingredients, preparation, _id);

const getAll = async () => Recipes.getAllRecipes();

const getById = async (id) => Recipes.getByIdRecipes(id);

module.exports = {
  create,
  getAll,
  getById,
};
