// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

  const findByPassword = async (password) => connection()
  .then((db) => db.collection('users').findOne({ password }));

const findByUsername = async (username) => connection()
  .then((db) => db.collection('users').findOne({ username }));

const create = async (name, email, password, role = 'user') => {
  const { insertedId } = await connection().then((db) =>
    db.collection('users').insertOne({
      name,
      email,
      password,
      role,
    }));

  return {
    _id: insertedId,
    name,
    email,
    password,
    role,
  };
};

module.exports = {
  findByEmail,
  findByPassword,
  findByUsername,
  create,
};
