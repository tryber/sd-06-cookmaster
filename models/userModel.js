const connection = require('./connection');

const getAllUsers = async () =>
  connection()
    .then((dbs) => dbs.collection('users').find().toArray());

const createUser = async (user) => {
  const { name, email, role, password } = user;
  return connection()
    .then((dbs) => dbs.collection('users')
      .insertOne(({
        name,
        email,
        role,
        password,
      })));
};

const findByPassword = async (password) => {
  const userPassword = await connection()
    .then((dbs) => dbs
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
