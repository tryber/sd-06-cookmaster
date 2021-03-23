const { Router } = require('express');
const { validateAdministrator } = require('../Authentication/validateAdministrator');
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

UsersRouter
  .post('/admin', validateAdministrator, validateUser, checkUniqueEmail, async (req, res) => {
  const newUser = { ...req.body, role: 'admin' };

  await createNewUser(newUser);

  return res.status(CreatedStatus).json({ newUser });
});

module.exports = { UsersRouter };
