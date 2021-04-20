// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (user) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne(user));
  return result;
};
const userFindEmail = async (email) => {
  const result = await connection().then((db) =>
    db.collection('users').find({ email: { $eq: email } }, { _id: 0, email: 1 }).toArray());
  return result;
};
const userFindPassword = async (password) => {
  const result = await connection().then((db) =>
    db.collection('users').find({ password: { $eq: password } }).toArray());
  return result;
};

module.exports = {
  createUser,
  userFindEmail,
  userFindPassword,
};
