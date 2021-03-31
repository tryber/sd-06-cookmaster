const express = require('express');

const usersRouter = express.Router();

const status201 = 201;
const status403 = 403;

// import querys
const {
  createUsers,
  findByemail,
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
const {
  tokenValid,
} = require('../services/authToken');
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

usersRouter.post('/admin', tokenValid, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'admin';
    const { emailReq, userId } = req;
    const user = await findByemail(emailReq);
    if (user.role !== role) {
      return res.status(status403).json({ message: 'Only admins can register new admins' });
    }
    if (user.role === role) {
      await createUsers({ name, email, password, role });
      return res.status(status201).json({
        user: { name, email, role, _id: userId },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = usersRouter;
