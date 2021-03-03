const { Router } = require('express');
const userService = require('../services/userService');

const { invalidEntries } = require('../middlewares/invalidEntries');
const { emailValidation } = require('../middlewares/emailValidation');
const IdValidation = require('../middlewares/idValidation');

const router = Router();

const OK = 200;
const CREATED = 201;

router.get('/', async (_req, res) => {
  const users = await userService.getAll();

  res.status(OK).json({ users });
});

router.get('/:id', IdValidation, async (req, res) => {
  const { id } = req.params;

  const user = await userService.findById(id);

  res.status(OK).json(user);
});

router.post('/', invalidEntries, emailValidation, async (req, res) => {
  const { name, email, password } = req.body;

  const { insertedId } = await userService.create(name, email, password, 'user');

  const user = {
    id: insertedId,
    name,
    email,
    role: 'user',
  };

  res.status(CREATED).json({ user });
});

module.exports = router;