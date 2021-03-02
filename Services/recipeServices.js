const models = require('../Models/recipeModels');

const create = async (id, name, ingredients, preparation) => models
  .create(id, name, ingredients, preparation);

const getAll = async () => models.getAll();

module.exports = {
  create,
  getAll,
};
