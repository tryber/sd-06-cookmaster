const { Router } = require('express');
const Users = require('../services/usersService');

const UsersRouter = new Router();

const SUCCESS = 200;
const CREATED = 201;

UsersRouter.get('/', async (_req, res) => {
  const users = await Users.getAll();
  res.status(SUCCESS).json(users);
});

UsersRouter.post('/', Users.validateUser, Users.checkUniqueEmail, async (req, res) => {
  const user = { ...req.body, role: 'user' };
  await Users.create(user);
  res.status(CREATED).json({ user });
});

module.exports = UsersRouter;