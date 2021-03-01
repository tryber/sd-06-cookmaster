const { Router } = require('express');
const { ObjectId } = require('mongodb');
const usersModel = require('../models/usersModel');
const { SUCCESS } = require('../variables');

const usersRouter = new Router();

usersRouter.post('/', async(req,res) => {
  await usersModel.createUser(req.body);
  res.status(SUCCESS).json(req.body);
});

usersRouter.get('/', async (_req,res) => {
  const allUsers = await usersModel.getAllUsers();
  res.status(SUCCESS).json({ allUsers });
});

module.exports = { usersRouter };
