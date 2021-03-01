const connection = require('./connection');

const createUser = async (data) => connection()
  .then((db) => db.collection('users').insertOne(data));

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray());

const findUserEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createUser,
  getAllUsers,
  findUserEmail,
};
