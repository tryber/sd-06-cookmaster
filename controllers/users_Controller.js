const { Router } = require('express');
const usersService = require('../services/users_Service');

const router = Router();

const OK = 200;
const Created = 201;
const BadRequest = 400;
const Conflict = 409;

router.get('/', async (_req, res) => {
  const user = await usersService.getAllUsers();

  res.status(OK).json(user);
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await usersService.loginUser(name, email, password);

    res.status(Created).json(user);
  } catch(e) {
    if(e.code === 'Conflict') {
      res.status(Conflict).json(e.err);
    }
    res.status(BadRequest).json(e);
  }
});

module.exports = router;
