const connection = require('./connection');

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray());

const createUser = async (data) => connection()
  .then((db) => db.collection('users').insertOne(data));

const findUser = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  getAllUsers,
  createUser,
  findUser,
};
