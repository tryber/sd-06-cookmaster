const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createUser = async (name, email, password, role) => {
  const userCreated = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({ user: { name, email, role, _id: result.insertedId } }));
  return userCreated;
};

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray());

module.exports = {
  createUser,
  getAllUsers,
};
