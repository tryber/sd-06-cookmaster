const connection = require('./connection');

const createUser = async (data) => connection()
  .then((db) => db.collection('users').insertOne(data));

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray());

module.exports = { createUser, getAllUsers };
