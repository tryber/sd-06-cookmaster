const { Router } = require('express');

const service = require('../services/usersService');

const router = Router();

router.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const newUser = await service.createUser(name, email, password);

  response.status(201).json({ user: newUser });
});

module.exports = router;