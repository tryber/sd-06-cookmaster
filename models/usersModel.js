const connection = require('./connection');

const getAllUsers = async () => {
  const getUsers = await connection()
  .then((db) => db.collection('users').find().toArray());
  return getUsers;
};

const createUser = async (name, email, password) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return ({ _id: insertedId, name, email, password, role: 'user' });
};

const findEmail = async (email) => {
  const getEmail = await connection()
  .then((db) => db.collection('users').findOne({ email }));
  return getEmail;
};

module.exports = {
  getAllUsers,  
  createUser,
  findEmail,
};
