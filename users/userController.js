const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { createUserService, createAdminService } = require('./userService');
const { validateUser, validateLogin, validateAdmin } = require('../Middlewares/validation');

const router = Router();
const secret = 'twocankeepasecretifoneofthemisdead';
const CREATED = 201;
const SUCCESS = 200;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

router.post('/users', validateUser, async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await createUserService(name, email, password);
  res.status(CREATED).json({ user: newUser });
});

router.post('/login', validateLogin, async (req, res) => {
  const payload = req.info;
  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(SUCCESS).json({ token });
});

router.post('/users/admin', validateAdmin, async (req, res) => {
  const { name, email, password } = req.body;
  const newAdmin = await createAdminService(name, email, password);
  console.log(newAdmin);
  res.status(CREATED).json({ user: newAdmin });
});

module.exports = router;
