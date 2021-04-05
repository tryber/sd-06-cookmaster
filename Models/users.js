const connection = require('./connection');

const addUser = (userInfo) => connection()
  .then((db) => db.collection('users').insertOne(userInfo));

const allUsers = () => connection()
  .then((db) => db.collection('users').find().toArray());

module.exports = {
  addUser,
  allUsers,
}