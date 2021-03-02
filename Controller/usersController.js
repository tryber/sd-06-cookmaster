const { Router } = require('express');
const { validateAdmin } = require('../Auth/validateAdmin');
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

UsersRouter.post('/admin', validateAdmin, validateUser, checkUniqueEmail, async (req, res) => {
  const newUser = { ...req.body, role: 'admin' };

  await createNewUser(newUser);

  return res.status(twoHundredOne).json({ newUser });
});

module.exports = { UsersRouter };