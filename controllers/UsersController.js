const { Router } = require('express');
const { CREATED, SUCCESS } = require('../utils');

const { getAllUsers, createUser } = require('../services');
const { validateUser, validateEmail } = require('../middlewares');

const routerUsers = Router();

routerUsers.post('/', validateEmail, validateUser, async (req, res) => {
  const { name, email, password } = req.body;
  const userCreated = await createUser(name, email, password);
  return res.status(CREATED).json(userCreated);
});

routerUsers.get('/', async (_req, res) => {
  const getAll = await getAllUsers();
  return res.status(SUCCESS).json({ users: getAll });
});

module.exports = routerUsers;
