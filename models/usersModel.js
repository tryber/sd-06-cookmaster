const connection = require('./connection');

const registerUser = (userInfo) => connection()
  .then((db) => db.collection('users').insertOne(userInfo));

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray());

  module.exports = {
    registerUser,
    getAllUsers,
  };