const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (obj) => {
  const answer = await connection()
    .then((db) => db.collection('recipes').insertOne(obj));
  return answer;
};

const listRecipes = async () => {
  const answer = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return answer;
};

const findById = async (id) => {
  const answer = await connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return answer;
};

const editById = async (id, obj) => {
  const { name, ingredients, preparation } = obj;
  const answer = await connection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: (ObjectId(id)) }, { $set: { name, ingredients, preparation } }));
  return answer;
};

module.exports = {
  createRecipes,
  listRecipes,
  findById,
  editById,
};