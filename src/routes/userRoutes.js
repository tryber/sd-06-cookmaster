const { Router } = require('express');

const validateUser = require('../middlewares/validateUser');

const userRoutes = Router();

const UserController = require('../controllers/UserController');

userRoutes.post('/', validateUser, UserController.createUser);

module.exports = userRoutes;
