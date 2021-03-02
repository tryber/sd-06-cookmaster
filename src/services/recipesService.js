const RecipesModel = require('../models/recipesModel');

const getAll = async () => {
  await RecipesModel.getAll();
};

const findById = async (id) => {
  await RecipesModel.findById(id);
};

const create = async (name, user) => {
  const newRecipe = await RecipesModel.create(name, user);

  return newRecipe;
};

const update = async (id, user) => {
  await RecipesModel.update(id, user);
};

const remove = async (id) => {
  await RecipesModel.remove(id);
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};