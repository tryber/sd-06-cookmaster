const connection = require('./connection');

const create = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));

const findAll = async () => connection().then((db) => db.collection('users').find({}).toArray());

module.exports = {
  create,
  findAll,
};
