const connection = require('./connection');

const coll = 'users';

const getByEmailAndPassword = async (email, password) => (
  connection().then((db) => db.collection(coll).findOne({ email, password }))
);

module.exports = { getByEmailAndPassword };