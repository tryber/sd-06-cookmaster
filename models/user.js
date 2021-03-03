const connection = require('./connection');

const registerUser = async (email, password, name) => {
  const { insertedId } = await connection().then((db) => db.collection('users').insertOne(
     { email, password, name, role: 'user' },
  ));
  return { user: { email, password, name, role: 'user', _id: insertedId } };
};

const getAllUsers = async () => {
  const users = await connection().then((db) => db.collection('users').find().toArray());
  return users;
};

module.exports = {
  registerUser,
  getAllUsers,
};