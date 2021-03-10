const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllUsers = async () =>
  connection()
    .then((db) => db.collection('users').find().toArray());

const createUsers = async (data) => {
  const user = await connection()
    .then((db) => db.collection('users').insertOne(data));
  const { insertedId } = user;
  return { user: { 
    _id: insertedId,
    ...user,
  } };
};

const getByUsersId = async (id) =>
  connection()
    .then((db) => db.collection('users').findOne(ObjectId(id)));

const getByUsersEmail = async (userEmail) =>
  connection()
    .then((db) => db.collection('users').findOne({ email: userEmail }));

module.exports = {
  getAllUsers,
  createUsers,
  getByUsersId,
  getByUsersEmail,
};