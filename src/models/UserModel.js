const { ObjectId } = require('mongodb');
const connection = require('../database');

const createUserDb = async (name, email, password) => {
  const newUser = connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return newUser;
};

const loginUserDb = async (email) => {
  const newUser = connection().then((db) =>
    db.collection('users').findOne({ email }));

  return newUser;
};

const salvedTokenDb = async (loginUser, token) => {
  const { _id } = loginUser;

  const tokenUser = connection().then((db) =>
    db.collection('users').updateOne({ _id: ObjectId(_id) }, { $set: { token } }));

  return tokenUser;
};

const searchUserByTokenDb = async (token) => {
  const user = connection().then((db) =>
    db.collection('users').findOne({ token }));

  return user;
};

const searchUserByEmailDb = async (email) => {
  const user = connection().then((db) =>
    db.collection('users').findOne({ email }));

  return user;
};

module.exports = {
  createUserDb,
  loginUserDb,
  salvedTokenDb,
  searchUserByTokenDb,
  searchUserByEmailDb,
};