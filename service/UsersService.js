const UsersModel = require('../model/UsersModel');

const createUser = async (name, email, password, role) => (
  UsersModel.createUser(name, email, password, role)
);

const findUserByEmail = async (email) => (
  UsersModel.findUserByEmail(email)
);

const emailValid = (email) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regexEmail.test(email);
};

module.exports = {
  createUser,
  findUserByEmail,
  emailValid,
};
