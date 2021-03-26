const { ObjectId } = require('mongodb');
const connection = require('./connection');

const searchRecipes = async () =>
connection()
  .then((db) => db.collection('recipes').find().toArray());

const createRecipe = async (data) =>
connection()
  .then((db) => db.collection('recipes').insertOne(data));

const searchOne = async (id) =>
connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const updateRecipe = async (id, name, ingr, prep) =>
connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingr, prep } },
  ));

const destroyRecipe = async (id) =>
connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const uploadImage = async (id, image) =>
connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }));

module.exports = {
  uploadImage,
  createRecipe,
  destroyRecipe,
  updateRecipe,
  searchRecipes,
  searchOne,
};
