const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, email, password) => {
  const { insertedId } = await connection().then((db) => db.collection('users').insertOne({
    name,
    email,
    password,
    role: 'user',
  }));

  return {
    user: {
      name,
      email,
      password,
      role: 'user',
      _id: insertedId,
    },
  };
};

const findByEmailAndPassword = async (email, password) => {
  const user = await connection().then((db) => db.collection('users')
    .findOne({ email, password }));

  if (!user) return null;

  return {
    _id: ObjectId(user.insertedId),
    email,
    role: 'user',
  };
};

module.exports = {
  create,
  findByEmailAndPassword,
};
