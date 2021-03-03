const { Router } = require('express');
const rescue = require('express-rescue');
const { UsersServices } = require('../services');
const { UserValidator } = require('../middlewares');

const UsersRoute = new Router();
const status200 = 200;
const status201 = 201;

UsersRoute.get('/', rescue(async (_req, res) => {
  const allUsers = await UsersServices.getAll();
  res.status(status200).json({ Users: allUsers });
}));

UsersRoute.post('/',
  UserValidator.UserValidator,
  rescue(async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = await UsersServices.postUser({ name, email, password });
    res.status(status201).json(newUser);
}));

module.exports = UsersRoute;
