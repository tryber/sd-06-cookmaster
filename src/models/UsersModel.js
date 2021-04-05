// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllUsers = async () => {
  const users = await connection().then((db) => db.collection('users').find().toArray());
  return users;
};

const findUser = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return user;
};

const createUser = async (name, email, password) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return ({ name, email, role: 'user', _id: insertedId });
};

module.exports = {
  createUser,
  findUser,
  getAllUsers,
};