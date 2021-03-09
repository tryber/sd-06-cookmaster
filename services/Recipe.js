const { ObjectId } = require('mongodb');
const Recipe = require('../models/Recipe');

const create = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;

  return Recipe.create(name, ingredients, preparation);
};

const findAll = async () => Recipe.findAll();

const findOne = async (id) => {
  const validId = ObjectId.isValid(id);

  if (!validId) return false;

  return Recipe.findOne(id);
};

module.exports = {
  create,
  findAll,
  findOne,
};
