const { Router } = require('express');
const { getAllService, createService } = require('../services/usersService');
const { validateUser, repeatEmail } = require('../middlewares/Users');

const routerUsers = Router();

const CREATE = 201;
// const SUCCESS = 200;

routerUsers.get('/', async (_req, res) => {
  const listUsers = await getAllService();
  return res.json({ users: listUsers });
});

routerUsers.post('/', validateUser, repeatEmail, async (req, res) => {
  const { name, email } = req.body;
  const user = await createService(name, email);
  return res.status(CREATE).json(user);
});

module.exports = routerUsers;