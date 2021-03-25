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
  try {
  const { name, email, password } = req.body;
  const role = 'user';
  const { insertedId } = await createUsers({ name, email, password, role });
  return res.status(status201).json(
    { user: { name, email, role, _id: insertedId } },
  ); 
} catch (error) {
    console.log(error);
  }
});

module.exports = usersRouter;
