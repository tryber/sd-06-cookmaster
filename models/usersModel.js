const connection = require('./connection');

const registerUser = (userInfo) => connection()
  .then((db) => db.collection('users').insertOne(userInfo));

const getAllUsers = () => connection()
  .then((db) => db.collection('users').find().toArray());

const getOneUser = (email) => connection()
.then((db) => db.collection('users').findOne({ email }));

  module.exports = {
    registerUser,
    getAllUsers,
    getOneUser,
  };