const express = require('express');

const UserModel = require('../models/userModel');
const { 
  verifyUser,
  checkPermission,
  validateJWT,
} = require('../middlewares/validations');

const routes = express.Router();

// Criar usuário
routes.post('/', verifyUser, async (req, res) => {
  const { name, email, password } = req.body;
  
  const role = 'user';
  const user = await UserModel.createUser(name, email, password, role);

  return res.status(201).json({ user });
});

// Listar todos os usuários
routes.get('/', async (_req, res) => {
  const users = await UserModel.getAllUsers();

  return res.status(200).json({ users });
});

// Criar usuário admin
routes.post('/admin', validateJWT, checkPermission, async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;

  const user = await UserModel.createUser(name, email, password, role);

  return res.status(201).json({ user });
});

module.exports = routes;
