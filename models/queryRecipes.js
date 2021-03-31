const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection().then((db) => db
  .collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return newRecipe;
};

const findByEmail = async (email) => {
  const emailDb = await connection().then((db) => db.collection('users').findOne(
    { email },
  ));
  return emailDb;
};

const getAllRecipes = async () => {
  const recipes = await connection().then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => {
 const recipe = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
 return recipe;
};

const updateRecipe = async (newRecipe) => {
  const { id, name, ingredients, preparation, userId } = newRecipe;
  await connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } },
  ));
};

const deleteRecipe = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

const addImage = async (id, image) => {
  await connection().then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, {
    $set: { image },
  }));
};

module.exports = {
  createRecipes,
  getRecipeById,
  findByEmail,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  addImage,
};
