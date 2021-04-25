const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const create = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return insertedId;
};

const listRecipes = async () => connection().then((db) => db
  .collection('recipes').find().toArray());

const recipeById = async (id) => connection().then((db) => db
  .collection('recipes').findOne({ _id: ObjectId(id) }));

const updateRecipe = async ({ id, name, ingredients, preparation, image }) => connection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, image } }));

const deleteRecipe = async (id) => connection().then((db) => db
.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  listRecipes,
  recipeById,
  updateRecipe,
  deleteRecipe,
  };