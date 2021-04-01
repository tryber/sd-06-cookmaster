const express = require('express');
const UserModel = require('../models/UserModel');
const { validateUser } = require('../middlewares/validateUser');

const userRouter = express.Router();

const CREATED = 201;

userRouter.get('/', async (_req, res) => {
  const allUsers = await UserModel.getAll();

  res.status(200).json(allUsers);
});

userRouter.post('/', validateUser, async (req, res) => {
  const { name, email, password, role } = req.body;
    const { insertedId } = await UserModel.create(name, email, password, role);
    const newUser = { user: { _id: insertedId, name, email, password, role: 'user' } };
    res.status(CREATED).json(newUser);
});

module.exports = userRouter;