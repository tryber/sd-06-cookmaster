const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const createRecipe = async (data) => connection()
  .then((db) => db.collection('recipes').insertOne(data));

const findOneRecipe = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const editRecipe = (id, name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  ));

module.exports = {
  createRecipe,
  editRecipe,
  findAllRecipes,
  findOneRecipe,
};
