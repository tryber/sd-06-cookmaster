const { Router } = require('express');

const UserController = require('../controllers/UserController');
const AdminController = require('../controllers/AdminController');

const validateUserData = require('../middlewares/validateUserData');
const ensureAuth = require('../middlewares/ensureAuth');
const ensureAdmin = require('../middlewares/ensureAdmin');

const userController = new UserController();
const adminController = new AdminController();

const userRoutes = Router();

userRoutes.post('/', validateUserData, userController.create);
userRoutes.post('/admin', validateUserData, ensureAuth, ensureAdmin, adminController.create);

module.exports = userRoutes;
