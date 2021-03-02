const { ObjectId } = require('mongodb');
const connection = require('./connection');

const fundAllRecipes = async () => connection()
  .then((db) => db.connection('recipes').find().toArry());

const createRecipes = async (data) => connection()
  .then((db) => db.connection('recipes').insertOne(data));

const findRecipes = async (id) => connection()
  .then((db) => db.connection('recipes').findOne(ObjectId(id)));

const editRecipes = async (id, name, ingr, prep) => connection
  .then((db) => db.connection('recipes').findAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingr, prep } },
  ));

module.exports = {
  fundAllRecipes,
  createRecipes,
  findRecipes,
  editRecipes,
};
