const { ObjectId } = require('mongodb');
const connection = require('./connection');

const fundAllRecipes = async () => connection()
  .then((db) => db.connection('recipes').find().toArry());

const createRecipes = async (data) => connection()
  .then((db) => db.connection('recipes').insertOne(data));

const findRecipes = async (id) => connection()
  .then((db) => db.connection('recipes').findOne(ObjectId(id)));

module.exports = {
  fundAllRecipes,
  createRecipes,
  findRecipes,
};
