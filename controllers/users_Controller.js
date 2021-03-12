const { Router } = require('express');
const { getAllUsers, createUser, validateUser } = require('../services/users_Service');

const router = Router();

const OK = 200;
const Created = 201;

router.get('/', async (_req, res) => {
  const user = await getAllUsers();

  res.status(OK).json(user);
});

router.post('/', validateUser, async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createUser(name, email, password);

  res.status(Created).json(user);
});

module.exports = router;
