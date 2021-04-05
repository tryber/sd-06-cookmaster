const { Router } = require('express');

const usersRouter = new Router();

const {
  addUser,
  validateUser,
  validateUniqueEmail,
} = require('../Services/users');

const S201 = 201;

usersRouter.post('./users', validateUser, validateUniqueEmail, async (req, res) => {
  const newUser = { ...req.body, role: 'user' };
  await addUser(newUser);
  return res.status(S201).json({ newUser });
});

module.exports = usersRouter;