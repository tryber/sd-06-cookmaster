const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createUser = async (name, email, password) => {
  const role = 'user';
  const userCreated = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({ user: { name, email, password, role, _id: result.insertedId } }));
  return userCreated;
};

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray());

module.exports = {
  createUser,
  getAllUsers,
};
