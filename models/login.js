const getConnection = require('./connection');

const login = async (email, password) => getConnection('users')
  .then((db) => db.insertOne({ email, password }))
  .then((result) => result.ops[0].email);

const findUserByEmail = async ({ email }) => getConnection('users')
  .then((db) => db.findOne({ email }));

module.exports = {
  login,
  findUserByEmail,
};
