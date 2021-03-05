const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAll = async () => {
  const db = await connection();
  return db.collection('recipes').find({}).toArray();
};

const findOne = async (id) => {
  const db = await connection();
  return db.collection('recipes').findOne({ _id: Object(id) });
};

const createOne = async (recipe) => {
  const db = await connection();
  const { insertedId } = await db.collection('recipes').insertOne({ ...recipe });
  return { insertedId, ...recipe };
};

const deleteOne = async (id) => {
  const db = await connection();
  return db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const updateOne = async (id, recipe) => {
  const db = await connection();
  return db.collection('recipes').insertOne({ _id: ObjectId(id), ...recipe });
};

module.exports = {
  updateOne, findAll, findOne, deleteOne, createOne,
};
