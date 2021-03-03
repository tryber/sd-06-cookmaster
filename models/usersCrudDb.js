const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password) => {
  const dataUser = {
    user: {
      email, name, password, role: 'user',
    },
  };
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne(dataUser));
  // const id = '_id';
  // dataUser[id] = insertedId;
  return dataUser;
};

const selectByEmail = async (email) => {

  const getAll = await connection()
    .then((db) => db.collection('users').findOne({ 'user.email': email }));
  return getAll;
};

module.exports = { createUser, selectByEmail };
