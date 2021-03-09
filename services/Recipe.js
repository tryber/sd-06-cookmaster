const { ObjectId } = require('mongodb');
const Recipe = require('../models/Recipe');

const create = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;

  return Recipe.create(name, ingredients, preparation);
};

const findAll = async () => Recipe.findAll();

const find = async (id) => {
  const validId = ObjectId.isValid(id);

  if (!validId) return false;

  return Recipe.find(id);
};

const edit = async (id, name, ingredients, preparation) => {
  const validId = ObjectId.isValid(id);

  if (!validId) return false;

  return Recipe.edit(id, name, ingredients, preparation);
};

module.exports = {
  create,
  findAll,
  find,
  edit,
};
