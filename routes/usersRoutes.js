const express = require('express');
const controllers = require('../controllers/users');

const users = express.Router();

users.post('/', controllers.createUser);

module.exports = users;
