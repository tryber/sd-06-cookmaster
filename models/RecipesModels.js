const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const findById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const create = async (recipe) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('recipes').insertOne({ ...recipe }));

  return {
    _id: insertedId,
    ...recipe,
  };
};

module.exports = {
  getAll,
  findById,
  create,
};
