const { Router } = require('express');

const appRoutes = Router();

const userController = require('../controllers/UserController');

const verifyUser = require('../middlewares/verifyUser');

const checkPermission = require('../middlewares/checkPermission');
const generateJWT = require('../auth/generateJWT');
const validateJWT = require('../auth/validateJWT');
const recipesRoutes = require('./recipes');

appRoutes.post('/users', verifyUser.register, userController.create);
appRoutes.get('/users', userController.getAll);
appRoutes.post('/users/admin', validateJWT, checkPermission, userController.createAdmin);

appRoutes.post('/login', verifyUser.login, generateJWT);

appRoutes.use('/recipes', recipesRoutes);

module.exports = appRoutes;