const { Router } = require('express');

const {
  checkEmail,
  getUsers,
  userCreate, 
  checkAdmin } = require('../services/usersServices');
const { validateUser } = require('../services/usersServices');
const { SUCCESS, CREATED } = require('../variables');

const usersRouter = new Router();

usersRouter.post('/', checkEmail, validateUser, async (req, res) => {
  let user;
  if (!req.body.role) {
    user = { ...req.body, role: 'user' };
  } else {
    user = req.body;
  }

  await userCreate(user);

  res.status(CREATED).json({ user });
});

usersRouter.get('/', async (_req, res) => {
  const allUsers = await getUsers();
  res.status(SUCCESS).json({ allUsers });
});

usersRouter.post('/admin', checkAdmin, async (req, res) => {
  const user = { ...req.body, role: 'admin' };

  await userCreate(user);

  res.status(CREATED).json({ user });
});

module.exports = { usersRouter };
