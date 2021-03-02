const services = require('../Services/recipeServices');

const create = async (id, name, ingredients, preparation) => services
  .create(id, name, ingredients, preparation);

const getAll = async () => services.getAll();

const findById = async (id) => services.findById(id);

module.exports = {
  create,
  getAll,
  findById,
};
