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

// usersRouter.get('/:id',
//   async (_req, res) => {
//     const status = 200;
//     res.status(status).json(res.locals.sale);
//   });

module.exports = usersRouter;
