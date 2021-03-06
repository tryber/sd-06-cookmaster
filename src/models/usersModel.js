const connection = require('../database/connection');

const collection = 'users';

const createUser = async (user) => {
  const createdUser = await connection().then((db) =>
    db.collection(collection).insertOne(user));

  return createdUser.ops[0];
};

const getUserByEmail = async (email) => {
  const found = await connection().then((db) =>
    db.collection(collection).findOne({ email }));

  return found;
};

module.exports = { createUser, getUserByEmail };
