const { Router } = require('express');
const { getAllService, createService } = require('../services/usersService');
const { validateUser } = require('../middlewares/Users');

const routerUsers = Router();

const CREATE = 201;
const SUCCESS = 200;

routerUsers.get('/', async (_req, res) => {
  const listUsers = await getAllService();
  return res.status(SUCCESS).json({ listUsers });
});

routerUsers.post('/', validateUser, async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createService(name, email, password);
  return res.status(CREATE).json({ user });
});

module.exports = routerUsers;