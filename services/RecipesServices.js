const jwt = require('jsonwebtoken');
const Recipes = require('../models/RecipesModel');

const getAll = async () => Recipes.getAll();

const getById = async (id) => {
  const data = await Recipes.getById(id);
  if (!data) throw new Error();
  return data;
};

const add = async (token, { name, ingredients, preparation }) => {
  const { _id: userId } = await jwt.verify(token, 'secretkey');
  return Recipes.add(name, ingredients, preparation, userId);
};

const update = async (id, name, ingredients, preparation) => Recipes
  .update(id, name, ingredients, preparation);

const remove = async (id) => Recipes.remove(id);

const addImage = async (id, path) => {
  const image = `localhost:3000/${path}`;
  return Recipes.addImage(id, image);
};

module.exports = { getAll, getById, add, update, remove, addImage };
