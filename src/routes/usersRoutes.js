const express = require('express');
const controllers = require('../controllers/users');
const middlewares = require('../middlewares');

const users = express.Router();

users.post('/admin', middlewares.auth, controllers.createAdmin);

users.post('/', controllers.createUser);

module.exports = users;
