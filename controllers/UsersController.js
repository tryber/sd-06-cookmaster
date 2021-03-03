const { Router } = require('express');
const { CREATED, SUCCESS } = require('../utils');

const { getAllUsers, createUser, createAdmin } = require('../services');
const { validateUser, validateEmail, validateAdmin } = require('../middlewares');

const routerUsers = Router();

routerUsers.post('/', validateEmail, validateUser, async (req, res) => {
  const { name, email, password } = req.body;
  const userCreated = await createUser(name, email, password);
  return res.status(CREATED).json(userCreated);
});

routerUsers.post('/admin', validateAdmin, validateUser, validateEmail, async (req, res) => {
  const { name, email, password } = req.body;
  const adminCreated = await createAdmin(name, email, password);
  return res.status(CREATED).json(adminCreated);
});

routerUsers.get('/', async (_req, res) => {
  const getAll = await getAllUsers();
  return res.status(SUCCESS).json({ users: getAll });
});

module.exports = routerUsers;
