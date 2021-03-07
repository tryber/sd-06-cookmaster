const Users = require('../services/Users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await Users.createUser(name, email, password);
  
  res.status(201).json(user);
};

const getAllUsers = async (req, res) => {
  const users = await Users.getAllUsers();
  res.status(200).json(users);
};

module.exports = {
  createUser,
  getAllUsers,
};