const { Router } = require('express');
const { getAllService, createService, createAdminService } = require('../services/usersService');
const { validateUser, validateAdmin } = require('../middlewares/Users');

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

routerUsers.post('/admin', validateAdmin, async (req, res) => {
  const { name, email } = req.body;
  const userCreate = await createAdminService(name, email);
  return res.status(CREATE).json(userCreate);
});

module.exports = routerUsers;