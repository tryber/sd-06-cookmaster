const { Router } = require('express');
const {
  createNewUser,
  validateUser,
  checkUniqueEmail,
  getUsers,
} = require('../service/usersService');

const usersRouter = new Router();

usersRouter.get('/', async (_req, res) => {
  const allUsers = await getUsers();
  res.status(200).json({ users: allUsers });
});

usersRouter.post('/', validateUser, checkUniqueEmail, async (req, res) => {
  const user = { ...req.body, role: 'user' };
  await createNewUser(user);
  return res.status(201).json({ user });
});

module.exports = { usersRouter };
