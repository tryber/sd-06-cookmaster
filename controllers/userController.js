const { Router } = require('express');
const { createUser } = require('../models/userModel');
const { fieldFinder, isEmailRegistered, emailValidator, } = require('../services/validators');
const { BAD_REQUEST, CONFLICT, CREATED } = require('../services/httpStatuses');
const { invalidEntries, emailAlreadyExists } = require ('../services/messages');

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
  const userContainer = { user: {
    _id: insertedId,
    name,
    email,
    password,
    role: 'user',
  } };

  return res.status(CREATED).json(userContainer);
});

module.exports = UserController;
