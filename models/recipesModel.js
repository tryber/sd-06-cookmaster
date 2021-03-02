const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const registerRecipe = (recipeInfo) => connection()
.then((db) => db.collection('recipes').insertOne(recipeInfo));

const findOneRecipe = (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const updateRecipe = (id, name, ingredients, preparation) =>
connection().then((db) => db.collection('recipes')
  .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

module.exports = {
  getAllRecipes,
  registerRecipe,
  findOneRecipe,
  updateRecipe,
};
