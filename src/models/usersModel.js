const connection = require('./connection');

const getAllUsers = async () => {
  const userList = await connection('users').then((db) => db.find().toArray());
  return userList;
};

const getUserByName = async (name) => {
  const userFound = await connection('users').then((db) => db.findOne(
    { name }, // nota { 'name': name }
  ));
  return userFound;
};

const getUserByEmail = async (email) => {
  const userFound = await connection('users').then((db) => db.findOne(
    { email }, // nota { 'email': email }
  ));
  return userFound;
};

const insertNewUser = async (name, email, password) => {
  const addUser = await connection('users').then((db) => db.insertOne(
    { name, email, password, role: 'user' }, { password: 0 },
  ));
  return addUser.ops;
};

const checkIfUserExists = async (email, password) => {
  const userFound = await connection('users').then((db) => db.findOne(
    { email, password },
  ));
  return userFound;
};

module.exports = {
  getAllUsers,
  getUserByName,
  getUserByEmail,
  insertNewUser,
  checkIfUserExists,
};
