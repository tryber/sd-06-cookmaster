// const { ObjectId } = require('mongodb');
const connection = require('../connection');

const createUser = async (name, email, password) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));
  
  return {
    name,
    email,
    role: 'user',
    _id: insertedId,
  };
};

const findEmail = async (email) => {
  const getEmail = await connection()
  .then((db) => db.collection('users').findOne({ email }));
  return getEmail;
};

module.exports = {
  createUser,
  findEmail,
};
