const connection = require('./connection');

const getAllUsers = async () => connection()
    .then((database) => database.collection('users').find().toArray());

const createUser = async (name, email, password) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }));
  return {
    _id: insertedId,
  };
};

const getByEmail = async (email) => {
 const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));
 return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getByEmail,
};
