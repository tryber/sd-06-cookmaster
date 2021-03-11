const connection = require('./connection');

const getAllUsers = async () => 
  connection()
    .then((db) => db.collection('users').find().toArray());

const createUsers = async (data) =>
  connection()
    .then((db) => db.collection('users').insertOne(data));

module.exports = {
  createUsers,
  getAllUsers,
};
