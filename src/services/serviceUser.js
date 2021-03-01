const model = require('../models/cookModelUsers');
const { zero } = require('../utils/messages');

const userCreate = async (name, email, password) => {
  const user = await model.createUser(name, email, password);
  return user;
};

const emailExist = async (_name, email, _passaword) => {
  const qetAllUsers = await model.getAllUsers;
  const emails = qetAllUsers.filter((user) => user.email === email);
  if (emails.length > zero) return false;
  return true;
};

module.exports = {
  userCreate,
  emailExist,
};
