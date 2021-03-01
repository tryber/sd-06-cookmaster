const { Router } = require('express');
// const { ObjectId } = require('mongodb');
const UsersService = require('../service/UsersService');
const login = require('./login');

const router = Router();

const invalidEntries = 'Invalid entries. Try again.';

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(400).json({ message: invalidEntries });

  if (!email) return res.status(400).json({ message: invalidEntries });

  if (!UsersService.emailValid(email)) return res.status(400).json({ message: invalidEntries });

  if (!password) return res.status(400).json({ message: invalidEntries });

  const existUser = await UsersService.findUserByEmail(email);

  if (existUser) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const userCreated = await UsersService.createUser(name, email, password, 'user');

  return res.status(201).json({ user: userCreated });
});

router.post('/login', UsersService.validateFieldLogin, login);

module.exports = router;