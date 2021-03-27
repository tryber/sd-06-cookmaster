const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const getAllRecipes = await connection().then((db) => db.collection('recipes').find().toArray());
  return getAllRecipes;
};

const getById = async (id) => {
  const getId = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return getId;
};

const update = async (id, name, ingredients, preparation) => {
  await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
};

const create = async (name, ingredients, preparation) => {
  const creation = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return creation;
};

const remove = async (id) => {
  const removed = await connection()
    .then((db) => db.collection('recipes').deleteOne(ObjectId(id)));
  return removed;
};

module.exports = {
  getAll,
  getById,
  update,
  create,
  remove,
};