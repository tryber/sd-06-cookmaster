const { Router } = require('express');

const {
  validationUsersBody,
} = require('../middleware/usersMiddleware');

const {
  registerUser,
} = require('../services/usersServices');

const usersRouter = Router();

usersRouter.post('/',
  validationUsersBody,
  async (req, res) => {
    const { body } = req;
    const user = await registerUser(body);
    res.status(201).json(user);
  });

module.exports = usersRouter;
