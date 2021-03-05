const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return newRecipe.ops[0];
};

const listRecipes = async () => (
  connection()
    .then((db) => db.collection('recipes').find().toArray())
);

const recipeById = async (id) => (
  connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
);

const updateRecipe = async (id, name, ingredients, preparation) => (
  connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
);

module.exports = {
  createRecipe,
  listRecipes,
  recipeById,
  updateRecipe,
};