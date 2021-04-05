const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addRecipe = (recipeInfo) => connection()
.then((db) => db.collection('recipes').insertOne(recipeInfo));

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getOneRecipe = (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const updateRecipe = (id, name, ingredients, preparation) =>
connection().then((db) => db.collection('recipes')
  .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

const deleteRecipe = (id) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const addImagePath = async (id, image) => connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }));

module.exports = {
  getAllRecipes,
  addRecipe,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
  addImagePath,
};
