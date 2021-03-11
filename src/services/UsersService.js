const Users = require('../models/Users');

const create = async (name, email, password) =>
  Users.createNewUser(name, email, password);

const getEmail = async (email) =>
  Users.getEmailUser(email);

const getEmailAndPassword = async (email, password) =>
  Users.emailAndPassword(email, password);

const getId = async (id) => Users.getIdUser(id);

module.exports = {
  create,
  getEmail,
  getEmailAndPassword,
  getId,
};
