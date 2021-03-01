const { Router } = require('express');
const {
  userRegister,
} = require('../models/Users');
const { validateInsertData } = require('../services/UsersServices');

const UsersRouter = new Router();

UsersRouter.post('/', async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    const validData = await validateInsertData(name, email, role, password);
    const newUser = await userRegister(validData[0].user);
    console.log(newUser);

    return res.status(validData[1]).json(newUser);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

module.exports = UsersRouter;
