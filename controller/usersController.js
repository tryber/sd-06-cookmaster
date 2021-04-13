const { Router } = require('express');
const {
  validateName,
  validateEmail,
  validatePassword,
  uniqueEmail,
} = require('../middleware/userValidation');

const userServices = require('../services/usersServices');

const router = Router();

const CREATE = 201;
const OK = 200;

router.get('/', async (_req, res) => {
  const users = await userServices.getAllUsers();

  res.status(OK).json({ users });
});

router.post('/', validateName, validateEmail, validatePassword, uniqueEmail, async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userServices.createUser(name, email, password);
  res.status(CREATE).json({ user: user.ops[0] });
});

module.exports = router;
