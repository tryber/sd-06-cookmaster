const { Router } = require('express');
const UsersServices = require('../services/UsersServices');

const UsersController = new Router();

UsersController.post('/', UsersServices);

module.exports = UsersController;