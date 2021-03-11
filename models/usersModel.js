// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllUsers = () =>
  connection().then((db) => db.collection('users').find().toArray());

const createUser = (data) =>
  connection().then((db) => db.collection('users').insertOne(data));

const findOneUser = (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  getAllUsers,
  createUser,
  findOneUser,
};
