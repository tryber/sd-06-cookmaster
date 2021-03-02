const { createUser, getAllUsers, getByEmail } = require('./UsersModel');
const connection = require('./connection');

module.exports = {
  connection,
  createUser,
  getAllUsers,
  getByEmail,
};
