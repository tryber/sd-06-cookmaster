// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password, role) => {
  const result = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));
  return result.ops[0];
};

const findUserByEmail = async (email) => (
  connection()
    .then((db) => db.collection('users').findOne({ email }))
);

module.exports = {
  createUser,
  findUserByEmail,
};
