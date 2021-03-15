const Recipes = require('../models/Recipes');

const create = async (name, ingredients, preparation, _id) =>
  Recipes.createNewRecipe(name, ingredients, preparation, _id);

const getAll = async () => Recipes.getAllRecipes();

const getById = async (id) => Recipes.getByIdRecipes(id);

const update = async (id, name, ingredients, preparation) => {
  await Recipes.updateRecipes(id, name, ingredients, preparation);
  return Recipes.getByIdRecipes(id);
};

const remove = async (id) => {
  await Recipes.deleteRecipes(id);
  return Recipes.getByIdRecipes(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
