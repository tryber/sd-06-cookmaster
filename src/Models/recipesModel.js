const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const createRecipe = async (data) => connection()
  .then((db) => db.collection('recipes').insertOne(data));

const findOneRecipe = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const editRecipe = async (id, name, ingr, prep) => connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingr, prep } },
  ));

const deleteRecipe = async (id) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const addImage = async (id, image) => connection()
  .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }));


module.exports = {
  addImage,
  createRecipe,
  deleteRecipe,
  editRecipe,
  findAllRecipes,
  findOneRecipe,
};
