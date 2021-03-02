const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const allUsers = await connection()
    .then((db) => db.collection('users')
    .find()
    .toArray())
    .catch((err) => {
      console.log(err.message);
    });

  return allUsers;
};

const create = async (name, email, password) => {
  const createNewUser = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }));

  return createNewUser;
};

const findById = async (id) => {
  const findUserById = await connection()
    .then((db) => db.collection('users').findOne(ObjectId(id)));

  return findUserById;
};

const findByEmail = async (email) => {
  const findUserByEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  return findUserByEmail;
};

const update = async (id, user) => {
  const updateUser = await connection().then((db) => db.collection('users').updateOne(
    { _id: ObjectId(id) },
    { $set: { user } },
  ));

  return updateUser;
};

const remove = async (id) => {
  const removeUser = await connection().then((db) => db.collection('users').deleteOne(
    { _id: ObjectId(id) },
  ));

  return removeUser;
};

module.exports = {
  getAll,
  create,
  findById,
  findByEmail,
  update,
  remove,
};