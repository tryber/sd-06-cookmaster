const connection = require('./connection');

const allUsers = async () => {
  const userList = await 
    connection('users').then((db) => db.find().toArray());
  
  return userList;
};
const userByName = async (name) => {
  const userFound = await 
    connection('users').then((db) => db.findOne(
    { name },
  ));
  return userFound;
};
const userByEmail = async (email) => {
  const userFound = await 
  connection('users').then((db) => db.findOne(
    { email },
  ));
  return userFound;
};
const newUserInserted = async (name, email, password) => {
  const addUser = await 
    connection('users').then((db) => db.insertOne(
    { name, email, password, role: 'user' }, { password: 0 },
  ));
  return addUser.ops;
};

const checkUser = async (email, password) => {
  const userFound = await 
    connection('users').then((db) => db.findOne(
    { email, password },
  ));
  return userFound;
};

module.exports = {
  allUsers,
  userByName,
  userByEmail,
  newUserInserted,
  checkUser,
};
