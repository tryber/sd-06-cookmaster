const Recipe = require('../models/Recipe');

const create = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;

  return Recipe.create(name, ingredients, preparation);
};

const findAll = async () => Recipe.findAll();

module.exports = {
  create,
  findAll,
};
