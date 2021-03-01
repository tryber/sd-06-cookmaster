const connection = require('./connection');

const registerUser = (userInfo) => connection()
  .then((db) => db.collection('users').insertOne(userInfo));

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray());

const getOneUser = async (email) => connection()
.then((db) => db.collection('users').findOne({ email }));

  module.exports = {
    registerUser,
    getAllUsers,
    getOneUser,
  };