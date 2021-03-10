const { Router } = require('express');
const { 
  createUsers,
   } = require('../models/userModel');
const { setValidation, ifExist } = require('../services/userService');

const users = new Router();

const CREATED = 201;

users.post(
  '/sales', setValidation, ifExist, async (req, res) => {
    const newUser = await createUsers(req.body);
    res.status(CREATED).json(newUser);
  },
);

module.exports = users;
