const { Router } = require('express');

const {
  loginUserValid,
} = require('../middleware/loginMiddleware');

const createToken = require('../JWT/createToken');

const loginRouter = Router();

loginRouter.post('/',
  loginUserValid,
  async (_req, res) => {
    const { password, name, ...userWithoutPasswordAndName } = res.locals.user;
    const token = createToken(userWithoutPasswordAndName);
    res.status(200).json({ token });
  });

module.exports = loginRouter;