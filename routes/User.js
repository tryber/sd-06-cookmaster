const express = require('express');

const User = require('../controllers/User');

const userRoutes = express.Router();

userRoutes.post('/', User.create);
userRoutes.get('/', User.findAll);

module.exports = userRoutes;
