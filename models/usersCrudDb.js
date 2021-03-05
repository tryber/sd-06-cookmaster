// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password) => {
  const dataUser = {
    user: {
      email, name, password, role: 'user',
    },
  };
  await connection().then((db) => db.collection('users').insertOne(dataUser.user));
  return dataUser;
};

const selectByEmail = async (email) => {
  const getAll = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return getAll;
};

module.exports = { createUser, selectByEmail };
