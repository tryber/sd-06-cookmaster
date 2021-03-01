const { Router } = require('express');
// const { ObjectId } = require('mongodb');
const {
  checkEmail,
  getUsers,
  userCreate } = require('../services/usersServices');
const { validateUser } = require('../services/usersServices');
const { SUCCESS, CREATED } = require('../variables');

const usersRouter = new Router();

usersRouter.post('/', checkEmail, validateUser, async (req, res) => {
  const user = { ...req.body, role: 'user' };

  await userCreate(user);

  res.status(CREATED).json({ user });
});

usersRouter.get('/', async (_req, res) => {
  const allUsers = await getUsers();
  res.status(SUCCESS).json({ allUsers });
});

module.exports = { usersRouter };
