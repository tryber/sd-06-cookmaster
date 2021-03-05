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

module.exports = {
  getAll,
  findById,
  create,
};
