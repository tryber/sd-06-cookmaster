// const rescue = require('express-rescue');

const usersService = require('./usersService');

const createUser = async (req, res) => {
  console.log('USERS - CONTROLLER');

  const newUser = req.body;

  const { createdUser, err } = await usersService.createUser(newUser);

  if (err) return res.status(err.statusCode).json({ message: err.message });

  res.status(201).json(createdUser);
};

module.exports = {
  // router,
  createUser,
};
