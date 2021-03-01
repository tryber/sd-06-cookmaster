const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('users').find().toArray());

const create = async (data) => connection().then((db) => db.collection('users').insertOne(data));

module.exports = {
  getAll,
  create,
};
