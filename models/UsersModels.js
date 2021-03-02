// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const create = async (name, email, password, role = 'user') => {
  const { insertedId } = await connection().then((db) =>
    db.collection('users').insertOne({
      name,
      email,
      password,
      role,
    }));

  return {
    _id: insertedId,
    name,
    email,
    password,
    role,
  };
};

module.exports = {
  findEmail,
  create,
};
