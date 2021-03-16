const connection = require('./connection');

const createUser = async (name, password, email, role) => connection()
  .then((db) => db.collection('users').insertOne({ name, password, email, role }));

const findUserByEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray());

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
};
