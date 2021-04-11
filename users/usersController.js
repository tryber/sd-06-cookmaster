// const rescue = require('express-rescue');

const usersService = require('./usersService');

const createUser = async (req, res) => {
  console.log('USERS - CONTROLLER');

  const newUser = req.body;

  const { createdUser, err } = await usersService.createUser(newUser);

  if (err) return res.status(err.statusCode).json({ message: err.message });

  res.status(201).json(createdUser);
};

const createAdmin = async (req, res) => {
  console.log('CREATE ADMIN CONTROLLER');
  const { userRole } = req;
  const { name, email, password } = req.body;

  const newAdmin = { name, email, password };

  const { createdAdmin, message } = await usersService.createAdmin(userRole, newAdmin);

  if (message) return res.status(403).json({ message });

  return res.status(201).json(createdAdmin);
};

module.exports = {
  createUser,
  createAdmin,
};
