const { Router } = require('express');
const { UsersServices } = require('../services/UsersServices');

// const {ObjectId} = require('mongodb');

const UsersController = new Router();

UsersController.post('/', UsersServices );

module.exports = UsersController;