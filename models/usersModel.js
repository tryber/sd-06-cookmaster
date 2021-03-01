const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllUsers = () =>
  connection().then((db) => db.collection('users').find().toArray());

const createUser = (data) =>
  connection().then((db) => db.collection('users').insertOne(data));


module.exports = {
  getAllUsers,
  createUser,
}
