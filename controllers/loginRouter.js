const express = require('express');

const loginRouter = express.Router();

const status201 = 201;

// import querys
// const {
//   createUsers,
// } = require('../models/queryUsers');
// -------------------------------------------
// import midllewares
const {
  emailExists,
  emailValid,
  senhalExists,
} = require('../services/midllewaresLogin');
// -------------------------------------------

loginRouter.post('/', emailExists, emailValid, senhalExists, async (req, res) => {
  const { email, password } = req.body;
  return res.status(status201).json(
    { email, password },
  );
});

module.exports = loginRouter;
