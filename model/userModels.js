// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (user) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne(user));
  return result;
};
const userFindEmail = async (email) => {
  const result = await connection().then((db) =>
    db.collection('users').find({ email: { $eq: email } }).toArray());
  return result;
};

module.exports = {
  createUser,
  userFindEmail,
};
