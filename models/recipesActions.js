const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, id) =>
  connection().then((db) => db.collection('recipes').insertOne(
    { name, ingredients, preparation, id },
  ));

const getAllRecipes = async () =>
    connection().then((db) => db.collection('recipes').find().toArray());

// solução de CreateFromHexString encontrada na documentação
// [https://mongodb.github.io/node-mongodb-native/3.5/api/ObjectID.html#.createFromHexString]
const getRecipeById = async (id) => connection().then(
  (db) => db.collection('recipes').findOne(ObjectID.createFromHexString(id)),
);

const updateRecipe = async (name, ingredients, preparation, id) =>
  connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectID.createFromHexString(id) },
    { $set: { name, ingredients, preparation } },
  ));

const deleteRecipe = async (id) =>
    connection().then((db) => db.collection('recipes').deleteOne(
      { _id: ObjectID.createFromHexString(id) },
    ));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
