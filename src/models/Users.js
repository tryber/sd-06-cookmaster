const connection = require('./connection');

const COLLECTION_NAME = 'users';

const getAll = async () => {
  const allUsers = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .find().toArray());
  
  return allUsers;
};

const create = async (name, email, password, role) => {
  const newUser = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .insertOne({ name, email, password, role }));

  return { 
    _id: newUser.insertedId,
    name,
    email,
    password,
    role,
  };
};

const findByEmail = async (email) => {
  const userByEmail = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .findOne({ email }));
  
  return userByEmail;
};

module.exports = {
  getAll,
  create,
  findByEmail,
};