const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'recipes';

const createRecipe = (name, ingredients, preparation, userId) => {
  return connection().then((db) => (
    db.collection(collection).insertOne({ name, ingredients, preparation, userId })
  ));
};

const getAllRecipes = () => {
  return connection().then((db) => (
    db.collection(collection).find().toArray()
  ));
};

const getRecipeById = (id) => {
  return connection().then((db) => (
    db.collection(collection).findOne(ObjectId(id))
  ))
};

const editRecipe = (id, name, ingredients, preparation, userId) => (
  connection().then((db) => (
    db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId } }
    )
  ))
);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
};