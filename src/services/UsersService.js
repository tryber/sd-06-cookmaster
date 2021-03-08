const Users = require('../models/Users');

const create = async (name, email, password) =>
  Users.createNewUser(name, email, password);

const getId = async (id) => Users.getIdUser(id);

module.exports = {
  create,
};
