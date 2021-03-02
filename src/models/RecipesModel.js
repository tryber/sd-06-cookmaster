const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getByIdRecipe = async (id) => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return recipes;
};

const createRecipe = async (name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return ({ name, ingredients, preparation, _id: insertedId });
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getByIdRecipe,
};