const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return db.collection('users').find().toArray();
};

const createUser = async (userInfo) => {
  const { name, email, password } = userInfo;
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({ 
    name,
    email,
    password,
    role: 'user',
  });
  const user = {
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId,
    },
  };
  return user;
};

const findByEmail = async (email) => {
  const db = await connection();
  return db.collection('users').findOne({ email });
};

module.exports = {
  getAll,
  createUser,
  findByEmail,
};