const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  await connection().then((db) => db.collection('recipes').insertOne(recipe));
  return recipe;
};

const selectAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const selectById = async (id) => connection().then((db) => db.collection('recipes')
  .findOne(ObjectId(id)));

module.exports = {
  createRecipe,
  selectAll,
  selectById,
};
