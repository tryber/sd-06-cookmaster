const connection = require('./connection');

const collection = 'users';

const createUser = (name, email, password) => {
  return connection().then((db) => (
    db.collection(collection).insertOne({ name, email, password, role: 'user' })
  ));
};

const findUserByEmail = (email) => {
  return connection().then((db) => (
    db.collection(collection).findOne({ email })
  ));
};

module.exports = {
  createUser,
  findUserByEmail,
};
