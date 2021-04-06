const { ObjectId } = require('mongodb');
const Recipe = require('../models/Recipe');

const create = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;

  return Recipe.create(name, ingredients, preparation);
};

const findAll = () => Recipe.findAll();

const find = (id) => {
  const validId = ObjectId.isValid(id);

  if (!validId) return false;

  return Recipe.find(id);
};

const edit = (id, name, ingredients, preparation) => {
  const validId = ObjectId.isValid(id);

  if (!validId) return false;

  return Recipe.edit(id, name, ingredients, preparation);
};

const remove = (id) => {
  const validId = ObjectId.isValid(id);

  if (!validId) return false;

  return Recipe.remove(id);
};

module.exports = {
  create,
  findAll,
  find,
  edit,
  remove,
};
