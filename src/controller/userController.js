const { Router } = require('express');
const { adminCheck } = require('../auth/admin');
const {
  createNewUser,
  ifExists,
  getUsers,
  setValidation,
} = require('../services/userService');

const users = new Router();

const SUCCESS = 200;
const CREATED = 201;

users.get('/', async (req, res) => {
  const usersList = await getUsers();
  res.status(SUCCESS).json({ users: usersList });
});

users.post('/', setValidation, ifExists, async (req, res) => {
  const user = { ...req.body, role: 'user' };
  await createNewUser(user);
  return res.status(CREATED).json({ user });
});

users.post('/admin', adminCheck, setValidation, ifExists, async (req, res) => {
  const adminUser = { ...req.body, role: 'admin' };
  await createNewUser(adminUser);
  return res.status(CREATED).json({ user: adminUser });
});

module.exports = { users }; 
