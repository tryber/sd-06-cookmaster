const express = require('express');

const verifyAuthorization = require('../middlewares/verifyAuthorization');
const User = require('../controllers/User');

const userRoutes = express.Router();

userRoutes.post('/', User.create);
userRoutes.get('/', User.findAll);
userRoutes.post('/admin', verifyAuthorization, User.createAdmin);

module.exports = userRoutes;
