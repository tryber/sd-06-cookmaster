// const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Users
const getAll = async () => {
  const users = await connection().then((db) => db.collection('users').find().toArray());
  return users;
};

// Find by Email
const findByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }))
    .catch((err) => console.error(err));
  return user;  
};

// Add New user
const create = async (name, email, password) => {
  const role = 'user';
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .catch((err) => console.error(err));
  return { user: { _id: insertedId, name, email, role } };
};

module.exports = {
  getAll,
  create,
  findByEmail,
};
