const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (data) =>
  connection().then((db) => db.collection('recipes').insertOne(data));

const allRecipes = () =>
  connection().then((db) => db.collection('recipes').find().toArray());

const oneRecipe = (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

const updateRecipe = (id, name, ingredients, preparation) =>
  connection().then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

module.exports = {
  allRecipes,
  createRecipe,
  oneRecipe,
  updateRecipe,
};