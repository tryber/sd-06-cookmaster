const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allUsers = await connection()
    .then((db) => db.collection('users')
      .find().toArray());

  return {
    users: allUsers
  };
};

const create = async (name, email, password, role = "user") => {
  const newUser = await connection()
    .then(db => db.collection('users')
      .insertOne({ name, email, password, role }));

  return { 
    _id: newUser.insertedId,
    name,
    email,
    password,
    role,
  };
};

module.exports = {
  getAll,
  create,
};