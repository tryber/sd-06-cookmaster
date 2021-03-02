const services = require('../Services/recipeServices');

const create = async (id, name, ingredients, preparation) => services
  .create(id, name, ingredients, preparation);

module.exports = {
  create,
};
