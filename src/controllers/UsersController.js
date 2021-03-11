const rescue = require('express-rescue');
const Boom = require('@hapi/boom');

const { UsersService } = require('../services');

const CREATED = 201;

const registerNewUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await UsersService.registerNewUser(name, email, password);

  if (newUser.error) {
    throw Boom.conflict(newUser.message);
  }

  res
    .status(CREATED)
    .json(newUser);
});

module.exports = {
  registerNewUser,
};
