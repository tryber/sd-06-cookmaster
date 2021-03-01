const rescue = require('express-rescue');

const { UsersService } = require('../services');

const registerNewUser = rescue(async (req, res) => {
  const { name, email } = req.body;

  const newUser = await UsersService.registerNewUser(name, email);

  res.status(201).json(newUser);
});

module.exports = {
  registerNewUser,
};
