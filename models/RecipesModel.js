const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => connection()
  .then((database) => database.collection('recipes').find().toArray());

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return {
    _id: insertedId,
  };
};

const getById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const editById = async (id, name1, ingredients1, preparation1) => connection()
  .then((db) => db.collection('recipes')
    .updateOne({
      _id: ObjectId(id),
    },
      {
        $set: {
          name: name1,
          ingredients: ingredients1,
          preparation: preparation1,
        },
      }));

const deleteRecipe = async (id) => {
  const { value } = await connection()
    .then((db) => db.collection('recipes')
      .findOneAndDelete({ _id: ObjectId(id) }));
  return value;
};

const addImage = async (id, imagePath) => connection()
  .then((db) => db.collection('recipes')
    .updateOne({
      _id: ObjectId(id),
    },
      {
        $set: {
          image: imagePath,
        },
      }, 
      { upsert: true }));

module.exports = {
  getAllRecipes,
  createRecipe,
  getById,
  editById,
  deleteRecipe,
  addImage,
};
