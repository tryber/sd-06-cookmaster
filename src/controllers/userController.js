const express = require('express');
const { validingBody, seeEmail } = require('../middleware/validingUser');

const userRouter = express.Router();

const { createUser } = require('../models/userModel');
const { cadastrado, tudoCerto } = require('../uteis/codeStatus');

/** Controller para cadastro de usuários */
userRouter.post('/', validingBody, seeEmail, async (req, res) => {
  const user = req.body;
  const result = createUser(user);
  return res.status(cadastrado).json(result);
});

/** Controller para lista todos os usuarios */
userRouter.get('/', async (req, res) => {
  const result = await console.log('listando todos os usuarios');
  return res.status(tudoCerto).json(result);
});

module.exports = userRouter;
