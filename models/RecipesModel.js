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

module.exports = {
  getAllRecipes,
  createRecipe,
  getById,
};
