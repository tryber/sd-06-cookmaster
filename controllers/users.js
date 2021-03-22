const { Router } = require('express');
const services = require('../services/users');
const { CREATED, CONFLICT } = require('../dictionary/StatusCode');
const usersValidation = require('../middlewares/usersValidation');
const { EMAIL_ALREADY_USED } = require('../dictionary/ErrorMessage');

const usersRouter = new Router();

usersRouter.post('/', 
  usersValidation.name,
  usersValidation.email,
  usersValidation.password,
  async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await services.createNewUser(name, email, password);

    console.log(newUser);

    if (newUser === 'invalid email') return res.status(CONFLICT).json(EMAIL_ALREADY_USED);

    return res.status(CREATED).json({ user: newUser });
  });

module.exports = {
  usersRouter,
};