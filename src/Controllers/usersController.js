const { Router } = require('express');
const {
  createNewUser,
  validateUser,
  checkUniqueEmail,
  getUsers,
} = require('../Services/usersService');

const UsersRouter = new Router();

/** Status Codes */
const SucessStatus = 200;
const CreatedStatus = 201;

UsersRouter.get('/', async (req, res) => {
  const allUsers = await getUsers();
  res.status(SucessStatus).json({ users: allUsers });
});

UsersRouter.post('/', validateUser, checkUniqueEmail, async (req, res) => {
  const user = { ...req.body, role: 'user' };
  await createNewUser(user);
  return res.status(CreatedStatus).json({ user });
});

module.exports = { UsersRouter };
