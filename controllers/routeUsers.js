const express = require('express');

const usersRouter = express.Router();

const status201 = 201;

// import querys
const {
  createUsers,
  // findByemail,
} = require('../models/queryUsers');
// -------------------------------------------
// import midllewares
const {
  nameExists,
  emailExists,
  emailValid,
  senhalExists,
  emailAlreadyExists,
} = require('../services/midllewaresUsers');
// -------------------------------------------

usersRouter.post('/', nameExists, emailExists, emailValid, senhalExists, emailAlreadyExists,
  async (req, res) => {
  const user = req.body;
  const { name, email } = req.body;
  const { insertedId } = await createUsers(user);
  return res.status(status201).json(
    { user: { name, email, role: 'user', _id: insertedId } },
  );
});

module.exports = usersRouter;
