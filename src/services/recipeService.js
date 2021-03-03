const Recipes = require('../models/Recipes');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await Recipes.create(name, ingredients, preparation, userId);
  return recipe;
};

const getAll = async () => {
  const allRecipes = await Recipes.getAll();
  return allRecipes;
};

const findById = async (id) => {
  const recipe = await Recipes.findById(id);
  return recipe;
};

const update = async (id, name, ingredients, preparation) => {
  const recipe = await Recipes.update(id, name, ingredients, preparation);
  return recipe;
};

const addImage = async (id, image) => {
  const recipe = await Recipes.addImage(id, image);
  return recipe;
};

const remove = async (id) => {
  const recipe = await Recipes.remove(id);
  return recipe;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  addImage,
  remove,
};