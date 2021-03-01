const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const createRecipe = async (data) => connection()
  .then((db) => db.collection('recipes').insertOne(data));

const findOneRecipe = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = {
  createRecipe,
  findAllRecipes,
  findOneRecipe,
};
