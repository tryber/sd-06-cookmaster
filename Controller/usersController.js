const { Router } = require('express');
const {
  createNewUser,
  validateUser,
  checkUniqueEmail,
  getUsers,
} = require('../Services/usersService');

const UsersRouter = new Router();

const twoHundred = 200;
const twoHundredOne = 201;

UsersRouter.get('/', async (req, res) => {
  const allUsers = await getUsers();
  res.status(twoHundred).json({ users: allUsers });
});

UsersRouter.post('/', validateUser, checkUniqueEmail, async (req, res) => {
  const user = { ...req.body, role: 'user' };
  await createNewUser(user);
  return res.status(twoHundredOne).json({ user });
});

module.exports = { UsersRouter };