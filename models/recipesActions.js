const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection().then((db) => db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId },
  ));

const getAllRecipes = async () =>
    connection().then((db) => db.collection('recipes').find().toArray());

// solução de CreateFromHexString encontrada na documentação
// [https://mongodb.github.io/node-mongodb-native/3.5/api/ObjectID.html#.createFromHexString]
const getRecipeById = async (id) => connection().then(
  (db) => db.collection('recipes').findOne(ObjectID.createFromHexString(id)),
);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
