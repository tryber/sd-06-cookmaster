const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes')
    .find().toArray());
  return recipes;
};

const getByIdRecipe = async (id) => {
  const recipes = await connection()
    .then((db) => db.collection('recipes')
    .findOne({ _id: ObjectId(id) }));
  return recipes;
};

const createRecipe = async (name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation }));
  return insertedId;
};

const updateRecipe = async ({ id, name, ingredients, preparation, image }) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, image } }));
  return recipe;
};

const deleteRecipe = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));
  return recipe;
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getByIdRecipe,
  updateRecipe,
  deleteRecipe,
};