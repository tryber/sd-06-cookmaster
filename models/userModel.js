const connection = require('./connection');

const collection = 'users';

const createUser = (name, email, password, role = 'user') => (
  connection().then((db) => (
    db.collection(collection).insertOne({ name, email, password, role })
  ))
);

const findUserByEmail = (email) => (
  connection().then((db) => (
    db.collection(collection).findOne({ email })
  ))
);

module.exports = {
  createUser,
  findUserByEmail,
};
