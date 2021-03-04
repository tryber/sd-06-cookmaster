const { Router } = require('express');
const rescue = require('express-rescue');
const servicesUsers = require('../services');
const validateJWT = require('../auth/validate');

const userRouter = Router();

userRouter.post('/', rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await servicesUsers.users.create(name, email, password);
  res.status(201).json({ user: newUser });
}));

userRouter.post('/admin', validateJWT, rescue(async (req, res) => {
  const { user } = req;
  const { name, email, password } = req.body;

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  const newUser = await servicesUsers.users.create(name, email, password, 'admin');
  return res.status(201).json({ user: newUser });
}));

module.exports = userRouter;
