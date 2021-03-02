const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => { 
  await connection().then((db) => db.collection('recipes').find().toArray());
};

const create = async (name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

  return {
    id: insertedId,
    name,
    ingredients,
    preparation,
  };
};

const findById = async (id) => {
  await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const update = async (id, user) => {
    await connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { user } },
  ));
};

const remove = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne(
    { _id: ObjectId(id) },
  ));
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};