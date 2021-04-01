// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'users';

const createUser = async (name, email, password) => {
  const { insertedId } = await connection().then((db) => db
    .collection(collection).insertOne({ name, email, password }));

  const newUser = {
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId.toString(),
    },
  };

  return newUser;
};

const getByEmail = async (email) => {
  const result = await connection().then((db) => db
  .collection(collection).findOne({ email }));

  return result;
};

module.exports = {
  createUser,
  getByEmail,
};
