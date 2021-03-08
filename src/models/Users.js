const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLECTION = 'users';

const createNewUser = async (name, email, password) => {
  const { insertedId } = await connection().then((db) =>
    db.collection(DB_COLECTION).insertOne({ name, email, password }));

  return {
    name,
    email,
    password,
    role: 'user',
    _id: insertedId,
  };
};

module.exports = {
  createNewUser,
};
