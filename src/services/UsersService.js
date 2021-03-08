const Users = require('../models/Users');

const create = async (name, email, password) =>
  Users.createNewUser(name, email, password);

const getEmail = async (email) =>
  Users.getEmailUser(email);

module.exports = {
  create,
  getEmail,
};
