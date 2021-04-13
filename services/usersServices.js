const Users = require('../model/usersModel');

const UNAUTHORIZED = 401;

const getAllUsers = async () => {
  const foundAll = await Users.getAllUsers();

  return foundAll;
};

const findUserByEmailAndPassword = async (email, password) => {
  const userFound = await Users.findUserByEmail(email);  
  console.log(userFound);
  if (!userFound || userFound.email !== email || userFound.password !== password) {
    return {
      status: UNAUTHORIZED,
      message: 'Incorrect username or password',
      isError: true,
    };
  }
  return userFound;
};

const createUser = async (name, email, password) => {
  const newUser = await Users.createUser(name, email, password);

  return newUser;
};

module.exports = {
  getAllUsers,
  createUser,
  findUserByEmailAndPassword,
};
