const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Users
const getAll = async () => {
  await connection().then((db) => db.collection('Users').find().toArray());
};

// Find by Id Users
const findById = async (id) => {
  await connection()
    .then((db) => db.collection('Users').findOne(ObjectId(id)))
    .catch((err) => console.error(err));
};

// Add New user
const create = async (name, email, passord) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('Users').insertOne({ name, email, passord }))
    .catch((err) => console.error(err));
  return { _id: insertedId, name, email, passord };
};

// Update user
const update = async (id, name, email, passord) => {
  await connection().then((db) => db.collection('Users').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, email, passord } }))
    .catch((err) => console.error(err));
  return { _id: id, name, email, passord };
};

// Remove user
const remove = async (id) => {
  connection()
    .then((db) => db.collection('Users').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => console.error(err));
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
