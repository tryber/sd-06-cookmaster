const connection = require('./connection');

const createUser = async (user) => {
  const { name, email, password, role } = user;
  const { ops: queryResult } = await connection().then((db) => db
    .collection('users')
    .insertOne({ name, email, password, role }));
  const createdUser = { user: queryResult[0] };

  return createdUser;
};

const findAllEmails = async () => (
  connection().then((db) => db
    .collection('users')
    .find(
      {},
      {
        fields: {
          _id: 0,
          email: 1,
        },
      },
    )
    .toArray())
);

const findByEmail = async (email) => (
  connection().then((db) => db
    .collection('users')
    .find({ email })
    .toArray())
);

const findUserByCredentials = async (email, password) => (
  connection().then((db) => db
    .collection('users')
    .find({ email, password })
    .toArray())
);

module.exports = {
  createUser,
  findAllEmails,
  findByEmail,
  findUserByCredentials,
};