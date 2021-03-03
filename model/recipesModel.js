const { ObjectId } = require('mongodb');
const connection = require('./connection');

// req 4
const findAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

// req 3
const createRecipe = (data) => connection()
  .then((db) => db.collection('recipes').insertOne(data));

// req 5
const findOneRecipe = async (id) => connection()
.then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = { 
  createRecipe,
  findAllRecipes,
  findOneRecipe,
};
