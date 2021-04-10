const connection = require('./connection');

const allUsers = async () => {
  const listOfUsers = await connection('users').then((db) => db.find().toArray());
  return listOfUsers;
};

const addNewUser = async (name, email, password, role) => {
  const newUser = await connection('users')
    .then((db) => db.insertOne({ name, email, password, role }));

  return { 
    _id: newUser.insertedId,
    name,
    email,
    password,
    role,
  };
};

const findUserByName = async (name) => {
  const gotUser = await connection('users').then((db) => db.findOne(
    { name },
  ));
  return gotUser;
};

const findUserByEmail = async (email) => {
  const gotUser = await connection('users').then((db) => db.findOne(
    { email },
  ));
  return gotUser;
};

const foundUserCheck = async (email, password) => {
  const gotUser = await connection('users').then((db) => db.findOne(
    { email, password },
  ));
  return gotUser;
};

module.exports = {
  allUsers,
  findUserByName,
  findUserByEmail,
  addNewUser, 
  foundUserCheck,
};
