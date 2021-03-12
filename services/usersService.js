const { getAllUsers, createUser } = require('../models/usersModel');

const getAllService = async () => {
  const user = await getAllUsers();
  console.log(user);
  return user;
};

const createService = async (name, email) => {
  const { insertedId } = await createUser(name, email);
  const newUser = {
    user: {
      _id: insertedId,
      name,
      email,
      role: 'user',
    },
  };
  return newUser;
};

module.exports = {
  getAllService,
  createService,
};