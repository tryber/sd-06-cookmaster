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

const findUser = async (userName) => {
  const getUser = await connection()
  .then((db) => db.collection('users').findOne({ userName }));
  return getUser;
};

const createAdmin = async (name, email, password) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({
      name, email, password, role: 'admin',
    }));

  return {
    name,
    email,
    role: 'admin',
    _id: insertedId,
  };
};

module.exports = {
  createUser,
  findEmail,
  findUser,
  createAdmin,
};
