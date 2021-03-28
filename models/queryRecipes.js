const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createRecipes = async (recipe) => connection().then((db) => db
  .collection('recipes').insertOne({ recipe }));

const findByrecipe = async (recipe) => connection().then((db) => db.collection('user').findOne(
  { 'user.recipes': { $exists: recipe } },
));

const findByEmail = async (email) => connection().then((db) => db.collection('users').findOne(
  { email },
));

const getRecipes = async () => connection().then((db) => db
.collection('recipes').find().toArray());

// db.user.find({ 'user.email': { $exists: 'fulano.silva@gmail.com'  } })

module.exports = {
  createRecipes,
  findByrecipe,
  getRecipes,
  findByEmail,
};
