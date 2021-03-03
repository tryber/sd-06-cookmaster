const models = require('../Models/recipeModels');

const create = async (id, name, ingredients, preparation) => models
  .create(id, name, ingredients, preparation);

const getAll = async () => models.getAll();

const findById = async (id) => {
  const recipe = await models.findById(id);

  return recipe;
};

const updateById = async (id, name, ingredients, preparation) => models
  .updateById(id, name, ingredients, preparation);

const deleteById = async (id) => models.deleteById(id);

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
