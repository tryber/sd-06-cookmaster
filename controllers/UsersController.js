const { Router } = require('express');
const UsersServices = require('../services/UsersServices');
const { userValidationRules, validateUser } = require('../middlewares/UsersValidators');

const router = Router();

const CREATED = 201;
const CONFLICT = 409;

router.post('/', userValidationRules(), validateUser, async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await UsersServices.create(name, email, password, role);

  if (!user) return res.status(CONFLICT).json({ message: 'Email already registered' });

  res.status(CREATED).json(user);
});

module.exports = router;
