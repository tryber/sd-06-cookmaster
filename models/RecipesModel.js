const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

const getById = async (id) => {
  const recipeId = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
    console.log(recipeId);
  return recipeId;
};

const create = async (name, ingredients, preparation) => {
  const createdRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return createdRecipe;
};

module.exports = {
  create,
  getAll,
  getById,
};