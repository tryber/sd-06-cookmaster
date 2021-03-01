// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllUsers = async () => connection()
    .then((database) => database.collection('users').find().toArray());

const createUser = async (name, email) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email }));
  return {
    _id: insertedId,
  };
};

const getByEmail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createUser,
  getAllUsers,
  getByEmail,
};
