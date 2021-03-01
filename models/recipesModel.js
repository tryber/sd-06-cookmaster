const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const registerRecipe = (recipeInfo) => connection()
.then((db) => db.collection('recipes').insertOne(recipeInfo));

const findOneRecipe = (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = {
  getAllRecipes,
  registerRecipe,
  findOneRecipe,
};
