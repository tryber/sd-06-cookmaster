const { Router } = require('express');
const { createUser, getAllUsers } = require('../Model/usersModel');
const { validateUser } = require('../Services/validateUser');
const { checkUniqueEmail } = require('../Services/checkUniqueEmail');

const UserRouter = new Router();

const RESPONSE = 201;

UserRouter.get('/', async (req, res) => {
  const allUsers = await getAllUsers();
  res.status(RESPONSE).json({ users: allUsers });
});

UserRouter.post('/', validateUser, checkUniqueEmail, async (req, res) => {
  const user = { ...req.body, role: 'user' };
  await createUser(user);

  return res.status(RESPONSE).json({ user });
});

module.exports = { UserRouter };
