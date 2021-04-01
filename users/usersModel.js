// const { ObjectId } = require('mongodb');

const connection = require('../connection');

const createUser = async (newUser) => {
  console.log('USERS - MODEL');
  const chavesUser = Object.keys(newUser);
  const includesRole = chavesUser.includes('role');
  const user = newUser;
  if (!includesRole) user.role = 'user';

  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ user }));
  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: insertedId,
    },
  };
};

const findByEmail = async (email) => {
  const result = await connection()
    .then((db) => db.collection('users').find({ 'user.email': email }).toArray());
  return result;
};

module.exports = {
  createUser,
  findByEmail,
};
