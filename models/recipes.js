const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const findById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = {
  insertRecipe,
  getAllRecipes,
  findById,
};
