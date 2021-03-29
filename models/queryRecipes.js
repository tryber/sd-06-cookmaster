const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => connection()
.then((db) => db
  .collection('recipes').insertOne({ name, ingredients, preparation, userId }));

// const findByrecipe = async (recipe) => connection().then((db) => db.collection('user').findOne(
//   { 'user.recipes': { $exists: recipe } },
// ));

const findByEmail = async (email) => connection().then((db) => db.collection('users').findOne(
  { email },
));

const getAllRecipes = async () => {
  const recipes = connection().then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => connection().then((db) => db
.collection('recipes').findOne(ObjectId(id)));

// db.user.find({ 'user.email': { $exists: 'fulano.silva@gmail.com'  } })

module.exports = {
  createRecipes,
  getRecipeById,
  findByEmail,
  getAllRecipes,
};
