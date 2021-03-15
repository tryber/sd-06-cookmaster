const { Router } = require('express');

const UsersController = require('../controllers/UsersController'); 

const validateUserObj = require('../middlewares/validateUserObj');
const ensureAuth = require('../middlewares/ensureAuth');
const ensureAdmin = require('../middlewares/ensureAdmin');

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', validateUserObj, usersController.create);
usersRouter.post('/admin', validateUserObj, ensureAuth, ensureAdmin, usersController.createAdmin);

module.exports = usersRouter;
