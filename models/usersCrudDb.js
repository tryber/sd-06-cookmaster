// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (dataUser) => {  
  await connection().then((db) => db.collection('users').insertOne(dataUser));
  return dataUser;
};

const selectByEmail = async (email) => {
  const getAll = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return getAll;
};

module.exports = { createUser, selectByEmail };
