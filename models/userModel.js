const connection = require('./connection');

const collection = 'users';

const createUser = (name, email, password, role = 'user') => {
  return connection().then((db) => (
    db.collection(collection).insertOne({ name, email, password, role })
  ));
};

const findUserByEmail = (email) => {
  return connection().then((db) => (
    db.collection(collection).findOne({ email: email })
  ));
};

module.exports = {
  createUser,
  findUserByEmail,
};
