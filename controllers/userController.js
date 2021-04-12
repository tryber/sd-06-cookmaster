const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { createUser } = require('../models/userModel');
const { fieldFinder, isEmailRegistered, emailValidator } = require('../services/validators');
const { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN } = require('../services/httpStatuses');
const { invalidEntries, emailAlreadyExists, adminCreatesAdmin } = require('../services/messages');
const tokenVerifier = require('../auth/authenticationMiddleware');

const UserController = new Router();

UserController.post('/', async (req, res) => {
  const { email, password, name } = req.body;
  const requiredFields = ['name', 'password', 'email'];
  const doRequiredFieldsExist = fieldFinder(req.body, requiredFields);
  const isEmailValid = emailValidator(email);
  const emailExists = await isEmailRegistered(email);

  if (!doRequiredFieldsExist || !isEmailValid) {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  if (emailExists) {
    return res.status(CONFLICT).json(emailAlreadyExists);
  }

  const { insertedId } = await createUser(name, email, password);
  const userContainer = { user: { _id: insertedId, name, email, password, role: 'user' } };

  return res.status(CREATED).json(userContainer);
});

UserController.post('/admin', tokenVerifier, async (req, res) => {
  const { authorization: token } = req.headers;
  const user = req.body;
  const { role } = jwt.decode(token);

  if (role !== 'admin') {
    return res.status(FORBIDDEN).json(adminCreatesAdmin);
  }
  const requiredFields = ['name', 'email', 'password'];
  const doRequiredFieldsExist = fieldFinder(user, requiredFields);

  if (!doRequiredFieldsExist) {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }
  const { name, email, password } = user;
  const { insertedId } = await createUser(name, email, password, 'admin');

  return res.status(CREATED).json({ user: { ...user, role: 'admin', _id: insertedId } });
});

module.exports = UserController;
