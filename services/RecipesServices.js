const jwt = require('jsonwebtoken');
const Recipes = require('../models/RecipesModel');

const getAll = async () => {
  return await Recipes.getAll();
}

const getById = async (id) => {
  return await Recipes.getById(id);
}

const add = async (token, { name, ingredients, preparation }) => {
  const { _id: userId } =  await jwt.verify(token ,'secretkey');
  return await Recipes.add(name, ingredients, preparation, userId);
}

const update = async (id, name, ingredients, preparation) => {
  return await Recipes.update(id, name, ingredients, preparation);
}

const remove = async (id) => {
  return await Recipes.remove(id);
}

module.exports = { getAll, getById, add, update, remove };
