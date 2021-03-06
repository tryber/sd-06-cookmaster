// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
    connection().then((db) => db.collection('users')
    .find().toArray());
    
const findByEmail = async (email) => 
  connection().then((db) => db.collection('users')
    .findOne({ email }));

const create = async (name, email, password, role) => {
  const { insertedId } = await connection().then((db) => db.collection('users')
    .insertOne({
      name,
      email,
      password,
      role,
    }));
  
    return {
      name,
      email,
      role,
      _id: insertedId,
    };
};

module.exports = {
  getAll,
  findByEmail,
  create,
};
