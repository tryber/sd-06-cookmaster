const { ObjectId } = require('mongodb');
const connection = require('../models/connections');

const collectionName = 'recipes';

const getAll = async () => connection()
  .then((db) => db.collection(collectionName).find().toArray());

const findById = async (id) => {
  const product = await connection()
    .then((db) => db.collection(collectionName).findOne(ObjectId(id)))
    .catch((err) => err.message);

  if (!product || typeof product !== 'object') return null;

  return product;
};

const create = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection(collectionName)
    .insertOne({ name, ingredients, preparation, userId }));

const update = async (id, data, userId) => connection()
  .then((db) => {
    const { name, ingredients, preparation } = data;
    return db.collection(collectionName)
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId } },
      );
  });

const deleteRecipe = async (id) => connection()
  .then((db) => db.collection(collectionName).deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteRecipe,
};