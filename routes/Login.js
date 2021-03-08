const express = require('express');
const login = require('../controllers/Login');

const loginRoutes = express.Router();

loginRoutes.post('/', login);

module.exports = loginRoutes;
