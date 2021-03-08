const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const create = async (name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return insertedId;
};

const listRecipes = async () => connection().then((db) => db
  .collection('recipes').find().toArray());

const recipeById = async (id) => connection().then((db) => db
  .collection('recipes').findOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  listRecipes,
  recipeById,
  };