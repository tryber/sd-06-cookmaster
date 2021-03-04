const { ObjectId } = require('mongodb');
const conn = require('../utils/connection');

const insertRecipe = async (recipe) => {
  const { insertedId } = await conn().then((db) => db.collection('recipes').insertOne(recipe));
  return insertedId;
};

const getAll = async () => conn()
  .then((db) => db.collection('recipes').find().toArray());

const findById = async (id) => conn()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const updateRecipe = async (id, recipe) => {
  const { value } = await conn()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) }, 
      { $set: { ...recipe } },
      { returnOriginal: false },
  ));
  return value;
};

const updateImageRecipe = async (id, imagePath) => {
  const { value } = await conn()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) }, 
      { $set: { image: imagePath } },
      { returnOriginal: false },
    ));
  return value;
};

const deleteRecipe = async (id) => conn()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  insertRecipe,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  updateImageRecipe,
};