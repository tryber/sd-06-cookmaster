const connection = require('./connection');

const getAllUsers = async () =>
  connection()
    .then((db) => db.collection('users').find().toArray());

const createUser = async (user) => {
  const { name, email, role, password } = user;
  return connection()
    .then((db) => db.collection('users')
      .insertOne(({
        name,
        email,
        role,
        password,
      })));
};

const findByPassword = async (password) => {
  const userPassword = await connection()
    .then((db) => db
      .collection('users')
      .findOne({ password }))
      .catch(() => false);
  return userPassword;
};

module.exports = {
  createUser,
  getAllUsers,
  findByPassword,
};
