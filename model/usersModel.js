const connection = require('./connection');

const getAllUsers = async () => {
  const getUsers = await connection().then((db) => db.collection('users').find().toArray());
  return getUsers;
};

const findUserByEmail = async (email) => {
  const foundEmail = await connection().then((db) => db.collection('users').findOne({ email }));
  return foundEmail;
};

const createUser = async (name, email, password) => {
  const newUser = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return newUser;
};

module.exports = {
  getAllUsers,
  findUserByEmail,
  createUser,
};
