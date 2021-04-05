const { Router } = require('express');

const usersRouter = new Router();

const {
  addUser,
  validateUser,
  validateUniqueEmail,
} = require('../Services/users');

const S201 = 201;

usersRouter.post('/', validateUser, validateUniqueEmail, async (req, res) => {
  const user = { ...req.body, role: 'user' };
  await addUser(user);
  return res.status(S201).json({ user });
});

module.exports = usersRouter;
