const { Router } = require('express');
const { checkEmail, userCreate, validateUser, getUsers } = require('../services/userServices');

const usersRouter = new Router();

usersRouter.post('/', checkEmail, validateUser, async (req, res) => {
  let user;
  if (!req.body.role) {
    user = { ...req.body, role: 'user' };
  } else {
    user = req.body;
  }

  await userCreate(user);

  res.status(201).json({ user });
});

usersRouter.get('/', async (req, res) => {
  const allUsers = await getUsers();
  res.status(200).json({ allUsers });
});

module.exports = { usersRouter };