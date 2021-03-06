const { Router } = require('express');
const rescue = require('express-rescue');
const Users = require('../models/Users');
const { validateUser } = require('./validation');

const router = Router();

// na verdade aqui é /users
router.get('/', rescue(async (req, res) => {
  const users = await Users.getAll();
  
  res.status(200).json(users);
}));

// Cadastrar usuarios
router.post('/', validateUser, rescue(async (req, res) => {
  req.body.role = 'user';
  const { name, email, password, role } = req.body;
  
  const newUser = await Users.create(name, email, password, role);
  
  res.status(201).json({ user: newUser });
}));

module.exports = router;
