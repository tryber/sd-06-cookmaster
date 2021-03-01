// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return result.ops[0];
};

const getAllRecipes = async () => (
  connection()
    .then((db) => db.collection('recipes').find().toArray())
);

module.exports = {
  createRecipe,
  getAllRecipes,
};
