const RecipesModels = require('../models/RecipesModels');

const getAll = async () => RecipesModels.getAll();

const findById = async (id) => {
  const recipe = await RecipesModels.findById(id);

  return recipe;
};

const create = async (data) => {
  const recipe = await RecipesModels.create(data);

  return recipe;
};

const update = async (id, data) => {
  const updatedRecipe = await RecipesModels.update(id, data);

  return updatedRecipe;
};

const remove = async (id) => {
  const removed = await RecipesModels.remove(id);

  return removed;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
