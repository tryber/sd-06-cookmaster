const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Users
const getAll = async () => {
  const users = await connection().then((db) => db.collection('users').find().toArray());
  return users;
};

// Find by Id Users
const findById = async (id) => {
  await connection()
    .then((db) => db.collection('users').findOne(ObjectId(id)))
    .catch((err) => console.error(err));
};

// Add New user
const create = async (name, email, password) => {
  const role = 'user';
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .catch((err) => console.error(err));
  return { user: { _id: insertedId, name, email, role } };
};

// Update user
const update = async (id, name, email, passord) => {
  await connection().then((db) => db.collection('users').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, email, passord } }))
    .catch((err) => console.error(err));
  return { _id: id, name, email, passord };
};

// Remove user
const remove = async (id) => {
  connection()
    .then((db) => db.collection('users').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => console.error(err));
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
