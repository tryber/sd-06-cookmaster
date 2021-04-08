const { ObjectId } = require('mongodb');

const connection = require('./connection');

const insertRecipe = (recipe) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .insertOne(recipe));

const getAllRecipes = () =>
  connection()
    .then((db) => db
      .collection('recipes')
      .find().toArray());

const getRecipe = (id) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .findOne(ObjectId(id)));

const putRecipe = (id, { name, ingredients, preparation }) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
    ));

const deleteRecipe = (id) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .deleteOne(
        { _id: ObjectId(id) },
      ));

module.exports = {
  insertRecipe,
  getAllRecipes,
  getRecipe,
  putRecipe,
  deleteRecipe,
};