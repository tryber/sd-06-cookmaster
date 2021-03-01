const connection = require('./connection');

const create = async (name, email, password, user) => {
  const creation = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }));
  return creation;
};

const getByEmail = async (email) => {
  const getEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return getEmail;
};

module.exports = {
  create,
  getByEmail,
};
