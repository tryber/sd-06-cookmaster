const usersModel = require('../model/usersModel');

const registerUsers = async (name, email, password, role) => {
  const newUsers = await usersModel.createUsers(name, email, password, role);
  return newUsers;
};
const findEmailExist = async (email) => {
  const emailExist = await usersModel.findEmail(email);
  return emailExist;
};
const getAllUsers = () => usersModel.getAll();

module.exports = {
  registerUsers,
  findEmailExist,
  getAllUsers,
};