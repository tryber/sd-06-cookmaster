const connection = require('./connection');

const getAllUsers = async () => {
  connection().then((db) => db.collection('users').find().toArray());
};

const createUser = async (name, email) => 
  connection().then((db) => db.collection('users').insertOne({ name, email }));

const findEmail = async (email) => {
    connection().then((db) => db.collection('users').findOne({ email }));
  };

module.exports = {
  getAllUsers,  
  createUser,
  findEmail,
};