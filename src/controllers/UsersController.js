const rescue = require('express-rescue');

const { UsersService } = require('../services');

const CREATED = 201;

const registerNewUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await UsersService.registerNewUser(name, email, password);

  res
    .status(CREATED)
    .json(newUser);
});

module.exports = {
  registerNewUser,
};
