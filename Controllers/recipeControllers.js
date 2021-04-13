const services = require('../Services/recipeServices');

const create = async (id, name, ingredients, preparation) => services
  .create(id, name, ingredients, preparation);

const getAll = async () => services.getAll();

const findById = async (id) => services.findById(id);

const updateById = async (id, name, ingredients, preparation) => services
  .updateById(id, name, ingredients, preparation);

const deleteById = async (id) => services.deleteById(id);

const updatePath = async (id, path) => services.updatePath(id, path);

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  updatePath,
  deleteById,
};
